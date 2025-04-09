import React from "react";
import { CommentData } from "../../types/types";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LikeIcon from "@/assets/cleanFeed/like.svg";
import DislikeIcon from "@/assets/cleanFeed/dislike.svg";


/**
 * @component CommentCard
 * @description
 * Displays a comment card with avatar, name, time, comment text, and animated like/dislike buttons.
 * Avatar uses a dynamic generator, and animation uses framer-motion with tween transitions.
 *
 * @param {CommentData} props.comment - The comment to display
 * @param {() => void} props.onLike - Triggered when like is clicked
 * @param {() => void} props.onDislike - Triggered when dislike is clicked
 */
const CommentCard: React.FC<{
  comment: CommentData;
  onLike: () => void;
  onDislike: () => void;
}> = ({ comment, onLike, onDislike }) => {
  return (
    <div className="bg-[#C2E764] p-4 rounded-xl shadow-lg space-y-4">
      {/* Header: Avatar + Username + Time */}
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage
            src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${comment.comment_fake_name}`}
            alt={comment.comment_fake_name}
          />
          <AvatarFallback>{comment.comment_fake_name?.[0] ?? "U"}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold text-base text-gray-900">{comment.comment_fake_name}</p>
          <p className="text-sm text-gray-700">11 hr ago</p>
        </div>
      </div>

      {/* Comment text */}
      <p className="text-base text-gray-900 whitespace-pre-wrap">
        {comment.comment_text}
      </p>

      {/* Like / Dislike buttons with fixed animation */}
      <div className="flex gap-4 mt-2">
        {/* Like button */}
        <motion.button
          whileTap={{ scale: [1, 1.3, 1] }}
          transition={{ type: "tween", duration: 0.3 }}
          onClick={onLike}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-base font-semibold shadow-md flex items-center justify-center gap-2"
        >
          <img src={LikeIcon} alt="Like" className="w-5 h-5" />
          Like
        </motion.button>

        {/* Dislike button */}
        <motion.button
          whileTap={{ scale: [1, 1.3, 1] }}
          transition={{ type: "tween", duration: 0.3 }}
          onClick={onDislike}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-base font-semibold shadow-md flex items-center justify-center gap-2"
        >
          <img src={DislikeIcon} alt="Dislike" className="w-5 h-5" />
          Dislike
        </motion.button>
      </div>
    </div>
  );
};

export default CommentCard;
