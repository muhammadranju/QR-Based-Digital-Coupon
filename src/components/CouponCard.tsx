import React, { useRef, useEffect } from "react";
import { Download, Info, ShieldCheck, Flame } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";

export interface MomoProduct {
  name: string;
  quantity: string;
  normalPrice: number;
  loyalPrice: number;
}

interface CouponCardProps {
  products: MomoProduct[];
  storeName: string;
  tagline: string;
}

const CouponCard: React.FC<CouponCardProps> = ({
  products,
  storeName,
  tagline,
}) => {
  const couponRef = useRef<HTMLDivElement>(null);

  const downloadPNG = async () => {
    if (!couponRef.current) return;
    try {
      const canvas = await html2canvas(couponRef.current, {
        scale: 3,
        backgroundColor: "#000000",
        useCORS: true,
        logging: false,
      });
      const link = document.createElement("a");
      const safeName = "Momo-Hub-Loyalty-Coupon";
      link.download = `${safeName}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("PNG download failed:", err);
    }
  };

  const downloadPDF = async () => {
    if (!couponRef.current) return;
    try {
      const canvas = await html2canvas(couponRef.current, {
        scale: 3,
        backgroundColor: "#000000",
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width / 3, canvas.height / 3],
      });
      const safeName = "Momo-Hub-Loyalty-Coupon";
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 3, canvas.height / 3);
      pdf.save(`${safeName}.pdf`);
    } catch (err) {
      console.error("PDF download failed:", err);
    }
  };

  // Auto-download logic when scanned via QR
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("download") === "true") {
      const timer = setTimeout(() => {
        downloadPNG();
      }, 2000); // 2s delay to ensure full render
      return () => clearTimeout(timer);
    }
  }, []);

  // Construct QR URL with auto-download param
  const qrUrl = new URL(window.location.href);
  qrUrl.searchParams.set("download", "true");

  const [scale, setScale] = React.useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const cardWidth = 600; // Original width
        if (containerWidth < cardWidth) {
          setScale(containerWidth / cardWidth);
        } else {
          setScale(1);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 w-full max-w-4xl px-4 py-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full flex flex-col items-center"
      >
        {/* RESPONSIVE WRAPPER */}
        <div 
          ref={containerRef}
          className="w-full flex justify-center overflow-visible"
          style={{ height: `${320 * scale}px`, minHeight: '160px' }}
        >
          {/* THE REALISTIC COUPON CARD */}
          <div
            ref={couponRef}
            style={{
              width: "600px",
              height: "320px",
              backgroundColor: "#000000",
              color: "#ffffff",
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              display: "flex",
              boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
              border: "1px solid rgba(255, 77, 0, 0.2)",
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              flexShrink: 0,
            }}
          >
          {/* Left Section (Main Offer) */}
          <div
            style={{
              flex: "1",
              padding: "24px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Brand Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  padding: "4px",
                  border: "1.5px solid #ff4d00",
                }}
              >
                <img
                  src="/momo-logo.png"
                  alt="Logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div>
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "900",
                    margin: "0",
                    color: "#ffffff",
                    lineHeight: "1",
                  }}
                >
                  {storeName}
                </h2>
                <p
                  style={{
                    fontSize: "10px",
                    color: "#ffb800",
                    fontWeight: "700",
                    margin: "0",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {tagline}
                </p>
              </div>
            </div>

            {/* Coupon Title */}
            <div style={{ marginBottom: "16px" }}>
              <h1
                style={{
                  fontSize: "32px",
                  fontWeight: "900",
                  margin: "0",
                  color: "#ff4d00",
                  lineHeight: "1",
                }}
              >
                LOYALTY কুপন
              </h1>
              <p
                style={{
                  fontSize: "12px",
                  margin: "4px 0 0 0",
                  color: "#e2e8f0",
                  fontWeight: "500",
                }}
              >
                শুধুমাত্র আমাদের রেগুলার গ্রাহকদের জন্য
              </p>
            </div>

            {/* Pricing Table (Compact) */}
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(255, 77, 0, 0.1)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.5fr 1fr 1fr",
                  borderBottom: "1px solid rgba(255, 77, 0, 0.1)",
                  backgroundColor: "rgba(255, 77, 0, 0.1)",
                }}
              >
                <div
                  style={{
                    padding: "6px 12px",
                    fontSize: "9px",
                    fontWeight: "900",
                    color: "#ffb800",
                  }}
                >
                  আইটেম
                </div>
                <div
                  style={{
                    padding: "6px 12px",
                    fontSize: "9px",
                    fontWeight: "900",
                    color: "#94a3b8",
                    textAlign: "center",
                  }}
                >
                  রেগুলার
                </div>
                <div
                  style={{
                    padding: "6px 12px",
                    fontSize: "9px",
                    fontWeight: "900",
                    color: "#ffffff",
                    textAlign: "center",
                    backgroundColor: "#ff4d00",
                  }}
                >
                  আপনার দাম
                </div>
              </div>
              {products.map((p, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.5fr 1fr 1fr",
                    borderBottom:
                      i < products.length - 1
                        ? "1px solid rgba(255, 255, 255, 0.05)"
                        : "none",
                  }}
                >
                  <div style={{ padding: "8px 12px" }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "800",
                        color: "#ffffff",
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        fontSize: "9px",
                        color: "#ffb800",
                        fontWeight: "700",
                      }}
                    >
                      {p.quantity}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "8px 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#64748b",
                        textDecoration: "line-through",
                      }}
                    >
                      {p.normalPrice}৳
                    </span>
                  </div>
                  <div
                    style={{
                      padding: "8px 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(255, 77, 0, 0.05)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: "900",
                        color: "#ffb800",
                      }}
                    >
                      {p.loyalPrice}৳
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Note */}
            <div
              style={{
                marginTop: "auto",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Info size={14} style={{ color: "#ff4d00" }} />
              <p
                style={{
                  fontSize: "10px",
                  color: "#94a3b8",
                  margin: "0",
                  fontStyle: "italic",
                }}
              >
                অর্ডার করার সময় এই কুপনটি মোবাইলে প্রদর্শন করুন।
              </p>
            </div>
          </div>

          {/* Perforation Line */}
          <div
            style={{
              width: "1px",
              height: "100%",
              borderLeft: "2px dashed rgba(255, 255, 255, 0.2)",
              position: "relative",
            }}
          >
            {/* Top/Bottom Notches for Ticket Look */}
            <div
              style={{
                position: "absolute",
                top: "-10px",
                left: "-11px",
                width: "20px",
                height: "20px",
                backgroundColor: "#000000",
                borderRadius: "50%",
                border: "1px solid rgba(255, 77, 0, 0.2)",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: "-10px",
                left: "-11px",
                width: "20px",
                height: "20px",
                backgroundColor: "#000000",
                borderRadius: "50%",
                border: "1px solid rgba(255, 77, 0, 0.2)",
              }}
            ></div>
          </div>

          {/* Right Section (QR Area) */}
          <div
            style={{
              width: "180px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 77, 0, 0.02)",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "8px",
                borderRadius: "12px",
                border: "3px solid #ffb800",
                marginBottom: "12px",
                boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
              }}
            >
              <QRCodeSVG
                value={qrUrl.toString()}
                size={100}
                level="H"
                fgColor="#000000"
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <h4
                style={{
                  fontSize: "12px",
                  fontWeight: "900",
                  color: "#ffffff",
                  margin: "0",
                  textTransform: "uppercase",
                }}
              >
                REDEEM
              </h4>
              <p
                style={{
                  fontSize: "8px",
                  color: "#ffb800",
                  margin: "2px 0 0 0",
                  fontWeight: "700",
                }}
              >
                SCAN TO DOWNLOAD
              </p>
            </div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ShieldCheck
                size={20}
                style={{ color: "#ff4d00", marginBottom: "4px" }}
              />
              <span
                style={{ fontSize: "8px", color: "#94a3b8", fontWeight: "800" }}
              >
                ID: MD-2026-LOYAL
              </span>
            </div>
          </div>

          {/* Background Branding (Faded Flame) */}
          <div
            style={{
              position: "absolute",
              bottom: "-20px",
              right: "160px",
              opacity: "0.05",
              pointerEvents: "none",
            }}
          >
            <Flame
              size={120}
              style={{ color: "#ff4d00" }}
              fill="currentColor"
            />
          </div>
        </div>
      </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-12 w-full justify-center">
          <button
            onClick={downloadPNG}
            className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-black bg-[#ff4d00] text-white hover:bg-[#ffb800] hover:text-black transition-all shadow-xl shadow-[#ff4d00]/20 cursor-pointer active:scale-95"
          >
            <Download size={24} />
            PNG কার্ড ডাউনলোড
          </button>
          <button
            onClick={downloadPDF}
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-black bg-white/5 text-white border-2 border-[#ff4d00]/30 backdrop-blur-xl hover:bg-white/10 transition-all shadow-xl cursor-pointer active:scale-95"
          >
            <Download size={24} />
            PDF প্রিন্টেবল কার্ড
          </button>
        </div>

        {/* Helper Note for User */}
        <p className="mt-6 text-slate-500 text-sm font-medium animate-pulse">
          * কুপনটি সরাসরি ফোনে সেভ হবে এবং যে কোনো সময় ব্যবহার করা যাবে
        </p>
      </motion.div>
    </div>
  );
};

export default CouponCard;
