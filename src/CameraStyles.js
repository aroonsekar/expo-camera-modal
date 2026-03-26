import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  // ─── Base ───────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },

  // ─── Full-screen Camera ─────────────────────────────
  cameraFullScreen: {
    flex: 1,
    position: "relative",
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },

  // ─── Grid ───────────────────────────────────────────
  gridLine: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  gridLineHorizontal: {
    height: StyleSheet.hairlineWidth,
    width: "100%",
  },
  gridLineVertical: {
    width: StyleSheet.hairlineWidth,
    height: "100%",
  },

  // ─── Top Bar (semi-transparent overlay) ─────────────
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  topBarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  topBarButtonActive: {
    backgroundColor: "rgba(255, 215, 10, 0.15)",
  },
  topBarRightGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  // ─── Flash helpers ──────────────────────────────────
  flashAutoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  autoFlashBadge: {
    color: "white",
    fontSize: 10,
    fontWeight: "700",
    marginTop: -8,
  },

  // ─── Bottom Bar (semi-transparent overlay) ──────────
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    alignItems: "center",
    paddingTop: 14,
  },
  zoomPill: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 14,
    marginBottom: 16,
  },
  zoomPillText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  shutterOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  shutterInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#fff",
  },
  shutterCapturing: {
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    transform: [{ scale: 0.92 }],
  },

  // ─── Aspect Ratio Badge (preview mode) ──────────────
  aspectBadge: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 50,
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    zIndex: 5,
  },
  aspectBadgeText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.3,
  },

  // ─── Preview ───────────────────────────────────────
  previewWrapper: {
    flex: 1,
    backgroundColor: "#000",
  },
  preview: {
    flex: 1,
    resizeMode: "contain",
  },
  previewControls: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 16,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
  previewButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  previewButtonConfirm: {
    backgroundColor: "#114073",
  },
  previewButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // ─── Permissions Screen ────────────────────────────
  permissionContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  permissionContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  permissionIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  permissionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  permissionText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 32,
  },
  permissionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#114073",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
    width: "100%",
    marginBottom: 12,
  },
  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  permissionButtonSecondary: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  permissionButtonSecondaryText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    fontWeight: "500",
  },
});
