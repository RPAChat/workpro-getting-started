# workpro-getting-started

## New and Recommended: Run with Github Codespace
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=581390026)

It will automatically install dependencies. Just put your token in and you are ready to go!

## How to run
Apply for a 7-day free trial (coming soon) token and put your token in 'token' in index.ts.

run: 
```
npm install
npm start
```

The system should start and the QrCode should appear in terminal.

## Potential problems

- System hangup after room announcement changes, See: https://github.com/wechaty/puppet-service/issues/216.
- Not able to use latest features, please try with @juzi/wechaty. We are working on pushing new feature to community version.

## Introducing new wecom puppet service: WorkPro
Hello Wechaty community!

We are JuziBot, one of the fastest-growing SCRM SaaS service providers in China, developer of wechaty-puppet-wxwork(hereinafter called 'WxWork').

![image](https://user-images.githubusercontent.com/13669999/209262332-43531e61-bf70-434b-b820-0deb63776218.png)

Now we are proud to announce our next-generation wecom puppet: wechaty-puppet-workpro(hereinafter called 'WorkPro').

It's been over two years since we published our first WxWork version. It has been well received, however there are some unsolvable problems due to basic structure:
- huge memory and cpu consumption
- react slowly when receiving wecom official broadcast
- takes a long time to sync messages when login

And WorkPro solves all above problems with a complete new design. It is absolutely incredible with great efficiency improvement. It also contains many great new features which are not completely supported by community version of wechaty currently. We are working on pushing these features now. Such as:
- Moment posting
- Quote messages
- Channel messages
- System messages
- Contact tagging
- Room announcement event*
- ...and much more

*Please note that room announce events will cause break down in current wechaty-puppet-service. See: https://github.com/wechaty/puppet-service/issues/216.

Besides the above room announcement event issue, WorkPro is compatible with current community wechaty version. Some of the latest features may be unusable, but you can still benefit from great efficiency improvement.
