import { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SidebarItem {
    id: string;
    label: string;
}

const MIN_WIDTH = 60;
const MAX_WIDTH = 300;

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState("dashboard");
    const [width, setWidth] = useState(220); // Initial width px
    const [isResizing, setIsResizing] = useState(false);

    const navigate = useNavigate();
    const sidebarRef = useRef<HTMLDivElement>(null);

    const handleItemClick = (itemId: string) => {
        setActiveItem(itemId);
        if (itemId === "dashboard") navigate(`/dashboard`);
        else navigate(`/dashboard/${itemId}`);
    };

    const sidebarItems: SidebarItem[] = [
        { id: "dashboard", label: "Dashboard" },
        { id: "readers", label: "Readers" },
        { id: "books", label: "Books" },
        { id: "lendings", label: "Lendings" },
    ];

    // Mouse move handler for resizing
    const onMouseMove = (e: MouseEvent) => {
        if (isResizing) {
            let newWidth = e.clientX - (sidebarRef.current?.getBoundingClientRect().left ?? 0);
            if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
            if (newWidth > MAX_WIDTH) newWidth = MAX_WIDTH;
            setWidth(newWidth);
        }
    };

    // Stop resizing on mouse up
    const onMouseUp = () => {
        if (isResizing) {
            setIsResizing(false);
        }
    };

    useEffect(() => {
        if (isResizing) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
        } else {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [isResizing]);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                ref={sidebarRef}
                style={{ width }}
                className="bg-gradient-to-b from-teal-600 to-green-600 text-white flex flex-col relative select-none"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-green-700">
                    <h1 className="text-xl font-bold flex items-center space-x-2">
                        <span>🧑‍🎓</span>
                        <span className="truncate">Library System</span>
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto mt-6">
                    <ul className="flex flex-col space-y-1 px-2">
                        {sidebarItems.map((item) => {
                            const isActive = activeItem === item.id;
                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => handleItemClick(item.id)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                                            isActive
                                                ? "bg-teal-700 text-white shadow-lg"
                                                : "text-teal-100 hover:bg-teal-700 hover:text-white"
                                        }`}
                                    >
                                        <span className="font-medium truncate">{item.label}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User Profile Section */}
                <div className="p-4 border-t border-green-700">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-teal-200" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Smith Librarian</p>
                            <p className="text-xs text-teal-200 truncate">Library Manager</p>
                        </div>
                    </div>
                </div>

                {/* Resizer */}
                <div
                    onMouseDown={() => setIsResizing(true)}
                    className="absolute top-0 right-0 h-full w-1 cursor-col-resize hover:bg-teal-300"
                    style={{ userSelect: "none" }}
                    aria-label="Resize sidebar"
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Your main content here */}
            </div>
        </div>
    );
};

export default Sidebar;
