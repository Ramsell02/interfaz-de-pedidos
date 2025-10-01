import React, { useEffect, useRef } from "react";

const CameraCapture = ({ onCapture, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (!isMounted) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error("❌ Error al acceder a la cámara:", error);
      }
    };
    startCamera();

    return () => {
      isMounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => {
        onCapture(blob); // 👈 devolvemos el blob al padre
      }, "image/jpeg");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <video ref={videoRef} style={{ width: "100%", borderRadius: "8px" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <br />
      <button onClick={handleCapture}>📸 Capturar</button>
      <button onClick={onClose} style={{ marginLeft: "10px" }}>❌ Cerrar</button>
    </div>
  );
};

export default CameraCapture;
