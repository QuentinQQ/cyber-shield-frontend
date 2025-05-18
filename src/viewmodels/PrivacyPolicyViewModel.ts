/**
 * ViewModel for the Privacy Policy page following MVVM pattern
 * Handles business logic for privacy policy related operations
 */
export class PrivacyPolicyViewModel {
  /**
   * Policy content to be displayed on the page
   */
  private readonly policyContent = {
    title: "Privacy Policy",
    summary: "Hi, our full privacy policy can be found by clicking this link: But if you don't want to read all of that I can give you a quick explanation. Here at WorldWeCreated we value your privacy which means we try to collect as little information from you as possible!",
    details: [
      "This means we don't collect information about who you are, such as your name or age.",
      "We also do not use any internet cookies, which are little files which store a bit of information on your device, unless they are strictly necessary, such as for security.",
      "When using our website there are some pages where you might need to enter some information, such as about your class size, or if you want to check if a message might be considered bullying.",
      "For these features we do collect this information but only to make our website better for visitors like you.",
      "When we do this we collect this information in a way where we can't tell who it was who shared it with us, but you should still be careful not to provide us with specific information, such as your name or age."
    ]
  };

  /**
   * Generates and provides the PDF download for the privacy policy
   * @returns {void} Triggers PDF download
   */
  downloadPolicyPDF = (): void => {
    // In a real implementation, this would either:
    // 1. Generate a PDF dynamically using a library like jsPDF
    // 2. Fetch a pre-made PDF from a server
    // For this example, we'll simulate downloading a static file

    // Create a link to the PDF file
    const link = document.createElement('a');
    link.href = '/privacy-policy.pdf'; // Path to the PDF file in the public folder
    link.download = 'WorldWeCreated-Privacy-Policy.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * Returns the policy content for display
   * @returns {Object} The policy content with title, summary, and details
   */
  getPolicyContent = () => {
    return this.policyContent;
  };
}

/**
 * Custom hook that provides the PrivacyPolicyViewModel functionality
 * @returns {Object} The ViewModel instance and its state
 */
export const usePrivacyPolicyViewModel = () => {
  const viewModel = new PrivacyPolicyViewModel();
  
  return {
    policyContent: viewModel.getPolicyContent(),
    downloadPolicyPDF: viewModel.downloadPolicyPDF
  };
}; 