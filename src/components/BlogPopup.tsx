import { motion } from "framer-motion";
import { X, Calendar, Clock, User, Share2, Bookmark, Heart, ArrowRight } from "lucide-react";
import { useEffect } from "react";

const BlogPopup = ({ post, onClose, blogImages, herbImages }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Helper to get image
  const getImage = (filename, imageMap) => {
    if (!filename) return null;
    const key = Object.keys(imageMap).find(key => key.includes(filename));
    return key ? imageMap[key].default : null;
  };

  const imageUrl = getImage(post.image, blogImages);
  const herbImageUrl = getImage(post.herbImage, herbImages);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/80 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 md:h-80 overflow-hidden bg-secondary/20">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary/30">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute bottom-4 left-4">
            <span className="bg-primary/90 text-white text-sm px-4 py-2 rounded-full">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.date}
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author}
            </div>
          </div>

          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            {post.title}
          </h2>

          {/* Author Info */}
          <div className="flex items-center gap-3 p-4 bg-secondary/20 rounded-xl mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{post.author}</p>
              <p className="text-sm text-muted-foreground">{post.authorTitle}</p>
            </div>
          </div>

          {/* Herb Information */}
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-6">
            <h3 className="font-heading text-lg font-bold text-primary mb-2 flex items-center gap-2">
              {herbImageUrl ? (
                <img 
                  src={herbImageUrl} 
                  alt={post.herbName}
                  className="w-8 h-8 rounded-full object-cover border-2 border-primary"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                  <span className="text-xs text-primary font-bold">H</span>
                </div>
              )}
              Featured Herb: {post.herbName}
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.herbUses.map((use) => (
                <span 
                  key={use} 
                  className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
                >
                  {use}
                </span>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border">
            {post.tags.map((tag) => (
              <span 
                key={tag} 
                className="bg-secondary/30 text-muted-foreground text-sm px-3 py-1 rounded-full hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Share & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-secondary/30 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-secondary/30 transition-colors">
                <Bookmark className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-secondary/30 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Share this article</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlogPopup;
