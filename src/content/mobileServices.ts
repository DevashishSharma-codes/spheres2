export interface MobileSubService {
  id: string;
  name: string;
  badge?: string;
  badgeColor?: string;
  subtitle: string;
  description: string;
  iconBg: string;
  iconType: string;
  tags: string[];
  metrics: { label: string; value: string };
  skeletonWidths: string[];
}

export const MOBILE_SERVICES_LIST: MobileSubService[] = [
  {
    id: "ios-native",
    name: "Native iOS",
    badge: "1",
    badgeColor: "bg-red-500",
    subtitle: "Swift 6 & SwiftUI",
    description: "Hardware-accelerated iOS applications engineered with SwiftUI, Combine, and Metal 3 for seamless 120Hz ProMotion rendering.",
    iconBg: "from-[#007AFF] to-[#0051C7]",
    iconType: "swift",
    tags: ["Swift 6", "SwiftUI", "Metal 3", "Combine"],
    metrics: { label: "Frame Budget", value: "< 8.3ms" },
    skeletonWidths: ["w-3/4", "w-1/2", "w-5/6"],
  },
  {
    id: "android-native",
    name: "Native Android",
    badge: "Jetpack",
    badgeColor: "bg-[#00DE7A] text-black",
    subtitle: "Kotlin & Compose",
    description: "Modern declarative Android apps leveraging Jetpack Compose, Kotlin Coroutines, and strict architectural MVVM boundaries.",
    iconBg: "from-[#3DDC84] to-[#20A05B]",
    iconType: "android",
    tags: ["Kotlin", "Compose", "Coroutines", "Koin"],
    metrics: { label: "App Start P95", value: "320ms" },
    skeletonWidths: ["w-2/3", "w-4/5", "w-1/2"],
  },
  {
    id: "react-native-expo",
    name: "React Native",
    badge: "Expo 52",
    badgeColor: "bg-[#7057D9]",
    subtitle: "New Architecture Fabric",
    description: "Cross-platform mobile apps using React Native 0.76+ TurboModules, Bridgeless architecture, and JSI native speed.",
    iconBg: "from-[#61DAFB] to-[#21A1C4]",
    iconType: "react",
    tags: ["React Native", "Expo", "Fabric", "JSI"],
    metrics: { label: "Code Sharing", value: "94%" },
    skeletonWidths: ["w-4/5", "w-3/5", "w-2/3"],
  },
  {
    id: "hardware-action-button",
    name: "Action Button",
    badge: "iOS 18",
    badgeColor: "bg-amber-500",
    subtitle: "Dynamic Island & Haptics",
    description: "Deep integration with iPhone 16 Pro Action Button, Dynamic Island ActivityKit, CoreHaptics, and background accessories.",
    iconBg: "from-[#F59E0B] to-[#D97706]",
    iconType: "zap",
    tags: ["Action Button", "Dynamic Island", "CoreHaptics"],
    metrics: { label: "Haptic Latency", value: "0ms" },
    skeletonWidths: ["w-5/6", "w-1/2", "w-3/4"],
  },
  {
    id: "offline-sync",
    name: "Offline-First Sync",
    badge: "SQLite",
    badgeColor: "bg-blue-600",
    subtitle: "WatermelonDB & CRDTs",
    description: "Zero network dependency UI with instant local reads, optimistic updates, and automatic multi-device conflict resolution.",
    iconBg: "from-[#3B82F6] to-[#1D4ED8]",
    iconType: "database",
    tags: ["SQLite", "WatermelonDB", "CRDTs", "Sync Engine"],
    metrics: { label: "Local Query", value: "< 2ms" },
    skeletonWidths: ["w-3/4", "w-2/3", "w-1/2"],
  },
  {
    id: "biometric-security",
    name: "Secure Enclave",
    badge: "FaceID",
    badgeColor: "bg-emerald-600",
    subtitle: "Biometrics & Keychain",
    description: "Hardware-level security using Apple Secure Enclave, Android Keystore, biometric authentication, and end-to-end token encryption.",
    iconBg: "from-[#10B981] to-[#047857]",
    iconType: "shield",
    tags: ["FaceID", "TouchID", "Keychain", "AES-256"],
    metrics: { label: "Auth SLA", value: "< 140ms" },
    skeletonWidths: ["w-2/3", "w-4/5", "w-3/5"],
  },
  {
    id: "on-device-ai",
    name: "On-Device AI",
    badge: "CoreML",
    badgeColor: "bg-[#8E79E8]",
    subtitle: "Local Inference Engine",
    description: "Zero-latency edge intelligence running CoreML, ExecuTorch, and quantized neural networks directly on the Apple Neural Engine.",
    iconBg: "from-[#7057D9] to-[#573EBF]",
    iconType: "cpu",
    tags: ["CoreML", "ExecuTorch", "Apple Neural Engine"],
    metrics: { label: "Local Tokens", value: "45 tok/s" },
    skeletonWidths: ["w-4/5", "w-1/2", "w-3/4"],
  },
  {
    id: "gesture-physics",
    name: "120 FPS Physics",
    badge: "Fluid",
    badgeColor: "bg-pink-600",
    subtitle: "Reanimated 3 & Gestures",
    description: "Desktop-grade tactile touch responsiveness with 120 FPS spring physics, pinch-to-zoom canvas, and zero drop-frame gestures.",
    iconBg: "from-[#EC4899] to-[#BE185D]",
    iconType: "sparkles",
    tags: ["Reanimated 3", "Gesture Handler", "Spring Physics"],
    metrics: { label: "Render Target", value: "120 FPS" },
    skeletonWidths: ["w-3/5", "w-4/5", "w-2/3"],
  },
];
