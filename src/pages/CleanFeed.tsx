import React, { useEffect, useState } from "react";
import Header from "../components/Header";

interface Comment {
  commentId: string;
  content: string;
  username: string;
  timestamp: string;
  // Add other fields as per API response
}

const API_URL = "https://6gejnpoe61.execute-api.ap-southeast-2.amazonaws.com/api/feed-game/get-all-comments";

const CleanFeed: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiInfo, setApiInfo] = useState({
    requestUrl: API_URL,
    requestOrigin: "",
    responseStatus: "",
  });

  useEffect(() => {
    // Set the request origin (useful for debugging)
    setApiInfo(prev => ({
      ...prev,
      requestOrigin: window.location.origin
    }));
    
    const fetchComments = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // No need to set Origin header manually as the browser sets this automatically
            
            // Uncomment this if you're using API keys
            // 'x-api-key': 'YOUR_API_KEY',
          },
          // Usually not needed unless your API requires credentials
          // credentials: 'include',
        });
        
        // Store response status for debugging
        setApiInfo(prev => ({
          ...prev,
          responseStatus: `${response.status} ${response.statusText}`
        }));
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        // Handle different possible response structures
        const commentsList = Array.isArray(data) ? data : 
                            (data.items || data.comments || data.results || []);
        
        setComments(commentsList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Fixed background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#4DC0BE] to-[#23A2DA] -z-10" />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 pt-28 pb-10 text-white">
        <h1 className="text-3xl font-bold mb-6">Clean Feed</h1>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Comments from API</h2>
          
          {/* API Request Information */}
          <div className="bg-black/30 p-4 rounded-md mb-6 text-sm">
            <h3 className="text-md font-medium mb-2">API Connection Info:</h3>
            <p><strong>Request Origin:</strong> {apiInfo.requestOrigin}</p>
            <p><strong>API Endpoint:</strong> {apiInfo.requestUrl}</p>
            <p><strong>Response Status:</strong> {apiInfo.responseStatus || 'Pending...'}</p>
          </div>
          
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-500/50 text-white p-4 rounded-md mb-4">
              <p className="font-medium">Error fetching data:</p>
              <p>{error}</p>
            </div>
          )}
          
          {!loading && !error && comments.length === 0 && (
            <p className="text-center py-4">No comments found.</p>
          )}
          
          {comments.length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-bold border-b border-white/20 pb-2 mb-4">
                <div>Username</div>
                <div className="md:col-span-2">Content</div>
                <div>Timestamp</div>
              </div>
              
              {comments.map((comment, index) => (
                <div 
                  key={comment.commentId || index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 border-b border-white/10 pb-4"
                >
                  <div className="font-medium">{comment.username}</div>
                  <div className="md:col-span-2">{comment.content}</div>
                  <div className="text-sm opacity-75">
                    {comment.timestamp ? new Date(comment.timestamp).toLocaleString() : 'N/A'}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Raw JSON data display */}
          {!loading && !error && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2">Raw Response Data:</h3>
              <pre className="bg-black/30 p-4 rounded-md overflow-x-auto text-xs max-h-80">
                {JSON.stringify(comments, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CleanFeed;