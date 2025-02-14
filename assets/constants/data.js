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
};
