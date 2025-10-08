// Header.tsx
import { Menu, Bot } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const FARMER_HEADER_HEIGHT = 64; // px
const SIDEBAR_EXPANDED_WIDTH = 256; // px
const SIDEBAR_COLLAPSED_WIDTH = 64; // px
const CHAT_SIDEBAR_WIDTH = 256; // px

const ChatHeader = ({ setSidebarOpen }) => {
  const { isExpanded } = useSidebar();
  const isMobile = useMediaQuery("(max-width: 639px)");

  // Calculate left offset for header
  const leftOffset = isMobile
    ? 0
    : (isExpanded ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH) + CHAT_SIDEBAR_WIDTH;

  return (
    <div
      className="fixed z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200/60 px-6 py-4 flex items-center justify-between"
      style={{
        top: FARMER_HEADER_HEIGHT,
        left: leftOffset,
        right: 0,
        height: "64px",
      }}
    >
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <button
          className="mr-4 text-gray-500 hover:text-emerald-600 focus:outline-none"
          onClick={() => setSidebarOpen((open) => !open)}
        >
          <span className="sr-only">Toggle Sidebar</span>
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-gray-900 truncate">
            Naturopura AI
          </h1>
          <p className="text-sm text-gray-600 font-medium truncate">
            Your intelligent farming assistant
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;