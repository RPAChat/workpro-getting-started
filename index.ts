import { ScanStatus, WechatyBuilder,types } from '@juzi/wechaty'
import QrcodeTerminal from 'qrcode-terminal'

const token = 'puppet_workpro_example_token' // put your token here
const bot = WechatyBuilder.build({
  puppet: '@juzi/wechaty-puppet-service',
  puppetOptions: {
    token,
    tls: {
      disable: true
      // currently we are not using TLS since most puppet-service versions does not support it. See: https://github.com/wechaty/puppet-service/issues/160
    }
  }
})

const store = {
  qrcodeKey: '',
}

bot.on('scan', (qrcode, status, data) => {
  console.log(`
  ============================================================
  qrcode : ${qrcode}, status: ${status}, data: ${data}
  ============================================================
  `)
  if (status === ScanStatus.Waiting) {
    store.qrcodeKey= getQrcodeKey(qrcode) || ''
    QrcodeTerminal.generate(qrcode, {
      small: true
    })
  }
}).on('verify-code', async (id: string, message: string, scene: types.VerifyCodeScene, status: types.VerifyCodeStatus) => {
  // 需要注意的是，验证码事件不是完全即时的，可能有最多10秒的延迟。
  // 这与底层轮询二维码状态的时间间隔有关。
  if (status === types.VerifyCodeStatus.WAITING && scene === types.VerifyCodeScene.LOGIN && id === store.qrcodeKey) {
    console.log(`receive verify-code event, id: ${id}, message: ${message}, scene: ${types.VerifyCodeScene[scene]} status: ${types.VerifyCodeStatus[status]}`)
    const verifyCode = '123456' // 通过一些途径输入验证码
    try {
      await bot.enterVerifyCode(id, verifyCode) // 如果没抛错，则说明输入成功，会推送登录事件
      return
    } catch (e) {
      console.log((e as Error).message)
      // 如果抛错，请根据 message 处理，目前发现可以输错3次，超过3次错误需要重新扫码。
      // 错误关键词: 验证码错误输入错误，请重新输入
      // 错误关键词：验证码错误次数超过阈值，请重新扫码'
      // 目前不会推送 EXPIRED 事件，需要根据错误内容判断
    }
  }
}).on('login', user => {
  console.log(`
  ============================================
  user: ${JSON.stringify(user)}, friend: ${user.friend()}, ${user.coworker()}
  ============================================
  `)
}).on('message', message => {
  console.log(`new message received: ${JSON.stringify(message)}`)
}).on('error', err => {
  console.log(err)
}).on('room-announce', (...args) => {
  console.log(`room announce: ${JSON.stringify(args)}`)
}).on('contact-alias', (...args) => {
  console.log(`contact alias: ${JSON.stringify(args)}`)
}).on('tag', (...args) => {
  console.log(`tag: ${JSON.stringify(args)}`)
})

bot.start()

const getQrcodeKey = (urlStr: string) => {
  const url = new URL(urlStr);
  return url.searchParams.get('key');
}