export default {
  onboarding: [
    {
      title: "Prices change quickly",
      description: "Memes are not assets or investments and do not have intrinsic value. Their prices may decrease at any time.",
      buttonText: "Enable notifications",
      buttonAction: "enableNotifications",  // 👈 Function name stored separately
      image: require("../images/notifcationicon.png"),
      footerText: "",
    },
    {
      title: "Invite your friends",
      description: "Make money when your friends sign up and trade with your link.",
      buttonText: "Invite a friend",
      buttonAction: "inviteFriend",  // 👈 Function name stored separately
      image: require("../images/inviteicon.png"),
      footerText: "Skip",
    },
    {
      title: "Stay in control",
      description: "Your memes are held in a private wallet. We can't access or freeze your holdings, ever.",
      buttonText: "Register or Sign in",
      buttonAction: "navigateToSignIn",  // 👈 Function name stored separately
      image: require("../images/lockicon.png"),
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
    "Pumpify is not an exchange and does not provide investment advice. The content of this app is for informational and entertainment purposes only and does not constitute financial advice, an offer, or a recommendation of any product or service.  ",
    "On Pumpify, users can create, buy, and sell cryptocurrency memecoins. These memecoins are not assets and do not possess any intrinsic utility or value. They exist purely for entertainment purposes and should not be considered an investment, currency, or store of value. The price of memecoins can be highly volatile and unpredictable, and price data within the app may be inaccurate or delayed.",
    "All transactions, including creating, buying, and selling memecoins, occur directly on the blockchain using a self-custodial wallet connected to your account. Conversion between fiat and cryptocurrencies is facilitated by MoonPay, Inc., and cash balances are held in USDC, a fully collateralized stablecoin.Pumpify charges a fee on transactions, including coin creation, buys, and sells, to cover platform costs. These fees may vary depending on network congestion and blockchain gas prices. Users are solely responsible for their own trading decisions and any memecoins they create. Pumpify does not guarantee the success, liquidity, or market demand of any memecoin on the platform. Engage responsibly, and always conduct your own research before participating.",
  ],
   trending : [
    { name: "jailstool", price: "$0.0392", cap: "$39.2M MKT CAP", change: "3.29%", image: require("../images/t1.png"), up: true,holdsCoin:true },
    { name: "TRUMP", price: "$15.79", cap: "$15.8B MKT CAP", change: "1.97%", image: require("../images/t1.png"), up: false,holdsCoin:false },
    { name: "arc", price: "$0.336", cap: "$335M MKT CAP", change: "49.29%", image: require("../images/t1.png"), up: true ,holdsCoin:true },
    { name: "jailstool", price: "$0.0392", cap: "$39.2M MKT CAP", change: "3.29%", image: require("../images/t1.png"), up: true,holdsCoin:false },
    { name: "jailstool", price: "$0.0392", cap: "$39.2M MKT CAP", change: "3.29%", image: require("../images/t1.png"), up: true,holdsCoin:true },
    { name: "TRUMP", price: "$15.79", cap: "$15.8B MKT CAP", change: "1.97%", image: require("../images/t1.png"), up: false,holdsCoin:false },
    { name: "arc", price: "$0.336", cap: "$335M MKT CAP", change: "49.29%", image: require("../images/t1.png"), up: true ,holdsCoin:true },
    { name: "jailstool", price: "$0.0392", cap: "$39.2M MKT CAP", change: "3.29%", image: require("../images/t1.png"), up: true,holdsCoin:false },
    { name: "jailstool", price: "$0.0392", cap: "$39.2M MKT CAP", change: "3.29%", image: require("../images/t1.png"), up: true,holdsCoin:true },
    { name: "TRUMP", price: "$15.79", cap: "$15.8B MKT CAP", change: "1.97%", image: require("../images/t1.png"), up: false,holdsCoin:false },
    { name: "arc", price: "$0.336", cap: "$335M MKT CAP", change: "49.29%", image: require("../images/t1.png"), up: true ,holdsCoin:true },
    { name: "jailstool", price: "$0.0392", cap: "$39.2M MKT CAP", change: "3.29%", image: require("../images/t1.png"), up: true,holdsCoin:false },
  ],
   topGainers : [
    { name: "dubcat", percent: "72.24%", type: "buy", image: require("../images/speaker.png") },
    { name: "GRPH", percent: "58.0%", type: "sell", image: require("../images/speaker.png") },
    { name: "dubcat", percent: "72.24%", type: "buy", image: require("../images/speaker.png") },
    { name: "GRPH", percent: "58.0%", type: "sell", image: require("../images/speaker.png") },
  ],
  spotlight: [
    {
      name: "OFFICIAL TRUMP",
      shortName: "TRUMP",
      percent: "-13.01%",
      type: "sell",
      status: "Live",
      image: require("../images/t1.png"), // Replace with actual image
    },
    {
      name: "OFFICIAL TRUMP",
      shortName: "TRUMP",
      percent: "-13.01%",
      type: "sell",
      status: "Live",
      image: require("../images/t1.png"), // Replace with actual image
    },
  ],  
   watchlistData : [
    {
      id: 1,
      name: "jailstool",
      price: "$0.0392",
      cap: "$39.2M MKT CAP",
      change: "3.29%",
      image: require("../images/t1.png"),
      up: true,
    },
    {
      id: 2,
      name: "TRUMP",
      price: "$15.79",
      cap: "$15.8B MKT CAP",
      change: "1.97%",
      image: require("../images/t1.png"),
      up: false,
    },
    {
      id: 3,
      name: "arc",
      price: "$0.336",
      cap: "$335M MKT CAP",
      change: "49.29%",
      image: require("../images/t1.png"),
      up: true,
    },
  ],  
};
