// Sidebar.tsx
import { Button } from "../ui/button";
import { Menu, Plus, MoreVertical, Edit3, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useSidebar } from "../../context/SidebarContext"; // adjust path if needed
import { useMediaQuery } from "../../hooks/useMediaQuery";

const FARMER_HEADER_HEIGHT = 64; // px
const SIDEBAR_EXPANDED_WIDTH = 256; // px
const SIDEBAR_COLLAPSED_WIDTH = 64; // px

const Sidebar = ({
  sessions,
  selectedSessionId,
  setSelectedSessionId,
  showNewSessionDialog,
  setShowNewSessionDialog,
  editingSessionId,
  setEditingSessionId,
  editingSessionName,
  setEditingSessionName,
  renameSession,
  deleteSession,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const { isExpanded } = useSidebar();
  const isMobile = useMediaQuery("(max-width: 639px)");

  // Calculate left offset based on FarmerSidebar state
  const leftOffset = isMobile
    ? 0
    : isExpanded
    ? SIDEBAR_EXPANDED_WIDTH
    : SIDEBAR_COLLAPSED_WIDTH;

  return (
    <div
      className={`fixed z-30 bg-gray-50 border-r border-gray-200 flex-shrink-0 flex flex-col transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-64"
      } w-64`}
      style={{
        minWidth: "16rem",
        top: FARMER_HEADER_HEIGHT, // ensures space below Farmer header
        left: leftOffset,
        height: `calc(100vh - ${FARMER_HEADER_HEIGHT}px)`,
      }}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <h2 className="text-lg font-bold text-gray-900">Chats</h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowNewSessionDialog(true)}
        >
          <Plus className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2"
          onClick={() => setSidebarOpen(false)}
        >
          <span className="sr-only">Close Sidebar</span>
          <Menu className="w-5 h-5" /> {/* Hamburger icon for toggle */}
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {sessions.map((session) => (
          <div
            key={session._id}
            className={`relative group rounded-lg p-2 flex items-center justify-between cursor-pointer transition-colors duration-200 ${
              selectedSessionId === session._id
                ? "bg-emerald-100 text-emerald-800"
                : "bg-white hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => setSelectedSessionId(session._id)}
          >
            {editingSessionId === session._id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  renameSession(session._id);
                }}
                className="flex-1 min-w-0 pr-8"
              >
                <Input
                  type="text"
                  value={editingSessionName}
                  onChange={(e) => setEditingSessionName(e.target.value)}
                  onBlur={() => renameSession(session._id)}
                  autoFocus
                  className="h-8 text-sm"
                />
              </form>
            ) : (
              <span className="truncate flex-1 min-w-0 text-sm font-medium">
                {session.name}
              </span>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 ml-2 text-gray-500 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingSessionId(session._id);
                    setEditingSessionName(session.name);
                  }}
                  className="text-gray-700 hover:bg-gray-100"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSession(session._id);
                  }}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;