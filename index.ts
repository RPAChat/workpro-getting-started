import { ScanStatus, WechatyBuilder } from '@juzi/wechaty'
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

bot.on('scan', (qrcode, status, data) => {
  console.log(`
  ============================================================
  qrcode : ${qrcode}, status: ${status}, data: ${data}
  ============================================================
  `)
  if (status === ScanStatus.Waiting) {
    QrcodeTerminal.generate(qrcode, {
      small: true
    })
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