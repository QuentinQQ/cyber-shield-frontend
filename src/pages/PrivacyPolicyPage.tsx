import React from 'react';
import { motion } from 'framer-motion';
import { usePrivacyPolicyViewModel } from '../viewmodels/PrivacyPolicyViewModel';
import PageWrapper from '@/components/PageWrapper';

/**
 * PrivacyPolicyPage Component
 * 
 * Displays the privacy policy information following MVVM architecture.
 * The view connects to the ViewModel via the usePrivacyPolicyViewModel hook.
 * 
 * @returns {JSX.Element} The rendered privacy policy page
 */
const PrivacyPolicyPage: React.FC = () => {
  // Connect to ViewModel through the custom hook
  const { policyContent, downloadPolicyPDF } = usePrivacyPolicyViewModel();

  return (
    <PageWrapper className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white py-10">
      <div className="container mx-auto px-4 max-w-3xl pt-16">
        {/* Animated header */}
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {policyContent.title}
        </motion.h1>

        {/* Summary section */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg">{policyContent.summary}</p>
        </motion.div>

        {/* Detailed sections */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ul className="space-y-4">
            {policyContent.details.map((detail, index) => (
              <motion.li 
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <span className="mr-2 text-cyan-400">&bull;</span>
                <span>{detail}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Download button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button
            onClick={downloadPolicyPDF}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Full Policy (PDF)
          </button>
        </motion.div>

        {/* Footer note */}
        <motion.p 
          className="text-center mt-12 text-sm text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Last updated: {new Date().toLocaleDateString()}
        </motion.p>
      </div>
    </PageWrapper>
  );
};

export default PrivacyPolicyPage; 