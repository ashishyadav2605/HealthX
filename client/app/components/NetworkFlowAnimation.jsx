import { useEffect, useState } from "react";

const NetworkFlowAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* FontAwesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />

      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* SVG for dotted paths and animations */}
          <svg
            className="absolute inset-0 w-full h-full z-10 pointer-events-none"
            viewBox="0 0 900 450"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#007AFF" />
              </marker>
            </defs>
            {/* Paths from icons to center */}
            <path
              d="M 50 85 Q 270 90 375 210"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="8,8"
              fill="none"
            />
            <path
              d="M 50 160 Q 270 150 375 225"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="8,8"
              fill="none"
            />
            <path
              d="M 50 225 Q 270 210 375 240"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="8,8"
              fill="none"
            />
            <path
              d="M 50 290 Q 270 270 375 255"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="8,8"
              fill="none"
            />
            <path
              d="M 50 355 Q 270 330 375 270"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="8,8"
              fill="none"
            />
            {/* Path from center to phone */}
            <path
              d="M 430 225 L 675 225"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="8,8"
              fill="none"
            />

            {/* One-way animated arrows */}
            {isAnimating && (
              <>
                {/* Arrows from icons to center */}
                <polygon points="0,-6 12,0 0,6" fill="#3B82F6">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path="M 50 85 Q 270 90 375 210"
                    rotate="auto"
                  />
                </polygon>
                <polygon points="0,-6 12,0 0,6" fill="#3B82F6">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path="M 50 160 Q 270 150 375 225"
                    rotate="auto"
                    begin="0.3s"
                  />
                </polygon>
                <polygon points="0,-6 12,0 0,6" fill="#3B82F6">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path="M 50 225 Q 270 210 375 240"
                    rotate="auto"
                    begin="0.6s"
                  />
                </polygon>
                <polygon points="0,-6 12,0 0,6" fill="#3B82F6">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path="M 50 290 Q 270 270 375 255"
                    rotate="auto"
                    begin="0.9s"
                  />
                </polygon>
                <polygon points="0,-6 12,0 0,6" fill="#3B82F6">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path="M 50 355 Q 270 330 375 270"
                    rotate="auto"
                    begin="1.2s"
                  />
                </polygon>

                {/* Continuous arrows from center to phone */}
                <polygon points="0,-6 12,0 0,6" fill="#3B82F6">
                  <animateMotion
                    dur="1.5s"
                    repeatCount="indefinite"
                    path="M 430 225 L 675 225"
                    rotate="auto"
                  />
                </polygon>
                <polygon points="0,-6 12,0 0,6" fill="#3B82F6">
                  <animateMotion
                    dur="1.5s"
                    repeatCount="indefinite"
                    path="M 430 225 L 675 225"
                    rotate="auto"
                    begin="0.5s"
                  />
                </polygon>
                <polygon points="0,-6 12,0 0,6" fill="#3B82F6">
                  <animateMotion
                    dur="1.5s"
                    repeatCount="indefinite"
                    path="M 430 225 L 675 225"
                    rotate="auto"
                    begin="1s"
                  />
                </polygon>
              </>
            )}
          </svg>

          <div className="flex flex-col lg:flex-row items-center justify-between relative z-20 gap-6">
            {/* Left Section - App Icons with Real Icons */}
            <div className="flex flex-col space-y-4 items-start ml-8">
              {/* WhatsApp */}
              <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-xl shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300">
                <i className="fab fa-whatsapp text-white text-xl"></i>
              </div>

              {/* Folder */}
              <div className="flex items-center justify-center w-12 h-12 bg-orange-400 rounded-xl shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300">
                <i className="fas fa-folder text-white text-xl"></i>
              </div>

              {/* Users/Team */}
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300">
                <i className="fas fa-users text-white text-xl"></i>
              </div>

              {/* Heart/Health */}
              <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-xl shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300">
                <i className="fas fa-heart text-white text-xl"></i>
              </div>

              {/* Gmail */}
              <div className="flex items-center justify-center w-12 h-12 bg-red-600 rounded-xl shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300">
                <i className="fab fa-google text-white text-xl"></i>
              </div>
            </div>

            {/* Center Section - HealthX Circle */}
            <div className="relative">
              <div className="w-48 h-48 lg:w-56 lg:h-56 border-4 border-blue-500 rounded-full flex items-center justify-center relative bg-white bg-opacity-180 backdrop-blur-sm shadow-xl">
                {/* Centered HealthX Text */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <span className="text-blue-600 text-xl font-bold tracking-wide">
                    HealthX
                  </span>
                </div>

                {/* Floating Icons */}
                {[
                  {
                    position: "top-6 left-9",
                    icon: "file-alt",
                    color: "blue",
                    duration: "8s",
                  },
                  {
                    position: "top-9 right-6",
                    icon: "chart-bar",
                    color: "green",
                    duration: "10s",
                    reverse: true,
                  },
                  {
                    position: "bottom-6 left-6",
                    icon: "envelope",
                    color: "purple",
                    duration: "12s",
                  },
                  {
                    position: "bottom-9 right-6",
                    icon: "medkit",
                    color: "red",
                    duration: "9s",
                  },
                ].map((doc, i) => (
                  <div
                    key={i}
                    className={`absolute ${doc.position} w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center animate-spin z-20`}
                    style={{
                      animationDuration: doc.duration,
                      animationDirection: doc.reverse ? "reverse" : "normal",
                    }}
                  >
                    <i
                      className={`fas fa-${doc.icon} text-${doc.color}-500 text-sm`}
                    ></i>
                  </div>
                ))}
              </div>

              {/* Rotating arrows around the circle - Now with 3 arrows */}
              {[0, 180].map((angle, i) => (
                <div
                  key={i}
                  className="absolute inset-0 z-30"
                  style={{
                    transform: `rotate(${angle}deg)`,
                  }}
                >
                  <div
                    style={{
                      animation: "orbit 8s linear infinite",
                      transformOrigin: "center center",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  >
                    <div
                      className="absolute w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full shadow-lg"
                      style={{
                        top: "-16px",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-b-[10px] border-b-white border-r-[6px] border-r-transparent rotate-90"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Section - Improved Phone Mockup */}
            <div className="relative">
              <div className="w-40 h-[320px] lg:w-48 lg:h-[384px] bg-gray-900 rounded-[2.5rem] p-1.5 shadow-xl border-4 border-gray-800">
                <div className="w-full h-full bg-gray-100 rounded-[2rem] overflow-hidden relative flex flex-col">
                  {/* Phone notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-4 bg-gray-900 rounded-b-xl z-10"></div>

                  {/* Status bar */}
                  <div className="pt-2 px-3 flex justify-between items-center text-xs text-gray-600">
                    <span>9:41</span>
                    <div className="flex space-x-1">
                      <i className="fas fa-signal"></i>
                      <i className="fas fa-wifi"></i>
                      <i className="fas fa-battery-full"></i>
                    </div>
                  </div>

                  {/* Messages header */}
                  <div className="px-4 py-2 flex justify-between items-center border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-user text-white text-xs"></i>
                      </div>
                      <span className="font-semibold text-gray-800 text-sm">
                        Messages
                      </span>
                    </div>
                    <i className="fas fa-ellipsis-v text-gray-400 text-sm"></i>
                  </div>

                  {/* Messages content */}
                  <div className="flex-1 p-3 overflow-y-auto space-y-2">
                    {[
                      {
                        text: "Hello! We've successfully secured all your medical documents in our encrypted system.",
                        time: "10:30 AM",
                        incoming: true,
                      },
                      {
                        text: "Thank you for keeping my documents safe!",
                        time: "10:32 AM",
                        incoming: false,
                      },
                      {
                        text: "It's our pleasure! Your records are protected with bank-level encryption and regular backups.",
                        time: "10:35 AM",
                        incoming: true,
                      },
                      {
                        text: "That's reassuring to know. I appreciate your service!",
                        time: "10:37 AM",
                        incoming: false,
                      },
                      {
                        text: "The pleasure is ours! Would you like us to notify you whenever we perform security updates on your files?",
                        time: "10:40 AM",
                        incoming: true,
                      },
                    ].map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${
                          msg.incoming ? "justify-start" : "justify-end"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] px-3 py-2 rounded-xl ${
                            msg.incoming
                              ? "bg-white rounded-bl-sm"
                              : "bg-blue-500 rounded-br-sm text-white"
                          }`}
                        >
                          <p className="text-xs">{msg.text}</p>
                          <span
                            className={`text-[0.6rem] ${
                              msg.incoming ? "text-gray-500" : "text-blue-200"
                            }`}
                          >
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input area */}
                  <div className="px-3 pb-3">
                    <div className="flex items-center bg-white rounded-full px-3 py-1.5 shadow-sm">
                      <i className="fas fa-plus text-gray-400 text-xs mr-2"></i>
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 border-none outline-none text-xs bg-transparent"
                      />
                      <i className="fas fa-microphone text-blue-500 text-xs ml-2"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background decorative elements */}
          {[
            {
              position: "top-8 left-8",
              size: "w-3 h-3",
              color: "blue",
              delay: "0s",
            },
            {
              position: "top-16 right-16",
              size: "w-4 h-4",
              color: "purple",
              delay: "1s",
            },
            {
              position: "bottom-16 left-16",
              size: "w-3.5 h-3.5",
              color: "green",
              delay: "2s",
            },
            {
              position: "bottom-8 right-8",
              size: "w-2 h-2",
              color: "orange",
              delay: "3s",
            },
          ].map((dot, i) => (
            <div
              key={i}
              className={`absolute ${dot.position} ${dot.size} bg-${dot.color}-200 rounded-full opacity-50 animate-pulse`}
              style={{ animationDelay: dot.delay }}
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default NetworkFlowAnimation;
