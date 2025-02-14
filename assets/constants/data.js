export default {
  onboarding: [
    {
      title: "Prices change quickly",
      description: "Moonshots are not assets or investments and do not have intrinsic value. Their prices may decrease at any time.",
      buttonText: "Enable notifications",
      buttonAction: "enableNotifications",  // 👈 Function name stored separately
      image: require("../images/speaker.png"),
      footerText: "",
    },
    {
      title: "Invite your friends",
      description: "Make money when your friends sign up and trade with your link.",
      buttonText: "Invite a friend",
      buttonAction: "inviteFriend",  // 👈 Function name stored separately
      image: require("../images/speaker.png"),
      footerText: "Skip",
    },
    {
      title: "Stay in control",
      description: "Your moonshots are held in a private wallet. We can't access or freeze your holdings, ever.",
      buttonText: "Register or Sign in",
      buttonAction: "navigateToSignIn",  // 👈 Function name stored separately
      image: require("../images/speaker.png"),
      footerText: 'Click "Allow paste" to link your referral code.',
    },
  ],
  
  signIn: {
    title: "What’s your email address?", // Using `’` instead of `'`
    description:
      "We only need your email to sign you in. We keep your email private and won’t send spam.",
    placeholder: "Enter your email address",
    checkboxText:
      "I agree to the Terms of Service and Privacy Policy.",
    termsText: "Terms of Service",
    privacyText: "Privacy Policy",
  },
  verifyEmail: {
    title: "Verify your email",
    description:
      "Please enter the verification code we emailed you to continue check your spam folder too.",
    placeholder: "Paste in code here...",
  },
  disclaimer: [
    "Moonshot is not an exchange and does not provide investment advice. The content of this app is not investment advice and does not constitute any offer or solicitation to offer or recommendation of any product or service.",
    "Cryptocurrency memecoins are not assets and do not possess any intrinsic utility or value. They are for entertainment purposes only and should not be considered an investment, currency, or anything of value. The price of memecoins can be extremely volatile and unpredictable. Price data in the app may be inaccurate or delayed.",
    "Conversion between fiat and cryptocurrencies is provided by MoonPay, Inc. Cash balances are held in USDC, a fully collateralized stablecoin. All swap transactions are made on the blockchain using the self-custodial wallet connected to your account. Moonshot takes a fee each time you buy or sell a coin to cover platform costs that vary based on network congestion and gas prices. Moonshot is a visual interface to blockchain decentralized exchanges and does not directly exchange, develop, create, maintain, or endorse any cryptocurrencies.",
  ],
};
