import React from "react";
import { CommentData } from "../../types/types";
import { motion } from "framer-motion";

/**
 * @component CommentCard
 * @description
 * Renders a single comment block including:
 * - Fake username
 * - Comment text
 * - Interactive Like/Dislike buttons with tap animation
 *
 * Intended to be used within a game or moderation interface.
 *
 * @param {Object} props - Component props
 * @param {CommentData} props.comment - The comment object to display (fake name + text)
 * @param {() => void} props.onLike - Handler function triggered when user clicks "Like"
 * @param {() => void} props.onDislike - Handler function triggered when user clicks "Dislike"
 *
 * @returns {JSX.Element} Rendered comment card component
 */
const CommentCard: React.FC<{
  comment: CommentData;
  onLike: () => void;
  onDislike: () => void;
}> = ({ comment, onLike, onDislike }) => (
  <div className="bg-[#C2E764] p-6 rounded-xl shadow-lg space-y-4">
    <h3 className="text-xl font-bold">{comment.comment_fake_name}</h3>
    <p className="text-lg">{comment.comment_text}</p>
    <div className="flex gap-4 mt-4">
      <motion.button
        whileTap={{ scale: 1.2 }}
        onClick={onLike}
        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-lg font-semibold"
      >
        👍 Like
      </motion.button>

      <motion.button
        whileTap={{ scale: 1.2 }}
        onClick={onDislike}
        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-lg font-semibold"
      >
        👎 Dislike
      </motion.button>
    </div>
  </div>
);

export default CommentCard;
