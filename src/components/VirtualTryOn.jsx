import React, { useState ,useRef,useMemo,useEffect} from 'react';

const OVERLAYS = [
  {
    id: 'fade',
    name: 'Clean Fade',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120"><path d="M12 96c0-41 29-74 67-74h82c38 0 67 33 67 74v14H12V96z" fill="#111827"/><path d="M24 98c0-30 23-55 54-55h84c31 0 54 25 54 55v6H24v-6z" fill="#1f2937"/></svg>`,
  },
  {
    id: 'curly',
    name: 'Curly Top',
    svg: '/curly.svg',
  },
  {
    id: 'pompadour',
    name: 'Pompadour',
    svg: '/Pompadour.svg',
  },
  {
    id: 'buzz',
    name: 'Buzz Cut',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120"><path d="M18 95c0-38 32-68 72-68h60c40 0 72 30 72 68v12H18V95z" fill="#4b5563"/></svg>`,
  },
  {
    id: 'quiff',
    name: 'Textured Quiff',
    svg: '/quiff.svg',
  },
  {
    id: 'hair_straiting',
    name: 'Hair Straiting',
    svg: '/Hair Straiting.svg',
  },
  {
    id: 'layered_wavy_hair',
    name: 'Layerd Wavy Hair',
    svg: '/Layerd Wavy Hair.svg',
  },
  {
    id: 'undercut',
    name: 'Undercut',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120"><path d="M10 90c16-48 62-72 120-72 42 0 74 14 100 42-27-8-52-6-75 8-18 10-38 16-67 16H10v6z" fill="#0b1220"/><path d="M26 96h188v12H26z" fill="#475569"/></svg>`,
  },
  {
    id: 'slick_back',
    name: 'Slick Back',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120"><path d="M18 98c0-24 10-44 30-58 20-14 43-20 70-20 43 0 79 18 110 52-31-11-60-10-85 4-17 10-35 15-58 15H18v7z" fill="#101827"/><path d="M22 96h196v11H22z" fill="#1e293b"/></svg>`,
  },
  {
    id: 'side_part',
    name: 'Side Part',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120"><path d="M15 97c9-42 41-68 88-68h70c29 0 49 23 52 55-13-10-29-12-44-4-20 10-35 14-58 14H15v3z" fill="#1f2937"/><path d="M116 30l7 62" stroke="#cbd5e1" stroke-width="3"/></svg>`,
  },
  {
    id: 'afro',
    name: 'Afro',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120"><g fill="#2b1b12"><circle cx="38" cy="64" r="28"/><circle cx="64" cy="44" r="26"/><circle cx="98" cy="34" r="28"/><circle cx="132" cy="34" r="28"/><circle cx="166" cy="42" r="27"/><circle cx="196" cy="62" r="25"/></g><rect x="20" y="72" width="200" height="34" rx="16" fill="#3a2418"/></svg>`,
  },
  {
    id: 'mohawk',
    name: 'Mohawk',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120"><path d="M118 10l20 38-14 6 12 28-14 4 10 22h-24l10-22-14-4 12-28-14-6 20-38z" fill="#111827"/><path d="M54 96h132v12H54z" fill="#334155"/></svg>`,
  },
  {
    id: 'man_bun',
    name: 'Man Bun',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120"><circle cx="122" cy="26" r="18" fill="#2f1b0f"/><path d="M18 98c0-34 28-62 63-62h80c35 0 63 28 63 62v10H18V98z" fill="#3c2517"/></svg>`,
  },
  {
    id: 'long_wavy',
    name: 'Long Wavy',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120"><path d="M18 28c16 4 29 13 39 27 7 11 9 23 9 37v22H28V88c0-11-2-20-8-28-5-7-8-16-8-27v-5z" fill="#2f1b0f"/><path d="M222 28c-16 4-29 13-39 27-7 11-9 23-9 37v22h38V88c0-11 2-20 8-28 5-7 8-16 8-27v-5z" fill="#2f1b0f"/><path d="M48 92c0-34 32-60 72-60s72 26 72 60v16H48V92z" fill="#3f2819"/></svg>`,
  },
  {
    id: 'fringe',
    name: 'Textured Fringe',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120"><path d="M16 94c0-36 31-64 70-64h68c39 0 70 28 70 64v14H16V94z" fill="#1f2937"/><path d="M22 70l20 18 22-18 20 18 22-18 22 18 22-18 22 18 22-18" stroke="#111827" stroke-width="6" fill="none" stroke-linecap="round"/></svg>`,
  },
  {
    id: 'wolf_cut',
    name: 'Wolf Cut',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120"><path d="M16 98c6-42 38-70 79-70h50c41 0 73 28 79 70v10H16V98z" fill="#2a1b11"/><path d="M18 84l18 10 16-12 18 11 17-13 18 12 17-12 18 12 17-12 18 11 16-10" stroke="#3f2a1a" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`,
  },
]
  


// Mustache overlays
const MUSTACHE_OVERLAYS = [
  {
    id: 'classic',
    name: 'Classic Mustache',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><path d="M10 30c10-10 30-10 50 0 20-10 40-10 50 0-10-5-30-5-50 0-20-5-40-5-50 0z" fill="#3a2418"/></svg>`,
  },
  {
    id: 'handlebar',
    name: 'Handlebar',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><path d="M10 30c10-10 30-10 50 0 20-10 40-10 50 0-10-10-30-10-50 0-20-10-40-10-50 0z" fill="#2b1b12"/><path d="M10 30c5-8 15-8 25 0" stroke="#1f2937" stroke-width="2" fill="none"/><path d="M110 30c-5-8-15-8-25 0" stroke="#1f2937" stroke-width="2" fill="none"/></svg>`,
  },
  {
    id: 'pencil',
    name: 'Pencil',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><rect x="30" y="24" width="60" height="4" rx="2" fill="#4b3a31"/></svg>`,
  },
  {
    id: 'horseshoe',
    name: 'Horseshoe',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><path d="M40 28c0 8-8 8-8 0V18h8v10zm40 0c0 8 8 8 8 0V18h-8v10z" fill="#2f1b0f"/></svg>`,
  },
  {
    id: 'chevron',
    name: 'Chevron',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><path d="M30 28c20 10 40 10 60 0-20 5-40 5-60 0z" fill="#3a2418"/></svg>`,
  },
]

const LABEL_TO_MUSTACHE_OVERLAY = {
  classic: 'classic',
  handlebar: 'handlebar',
  pencil: 'pencil',
  horseshoe: 'horseshoe',
  chevron: 'chevron',
};

const pickMustacheOverlayFromLabel = (label) => {
  if (!label) return null;
  const normalized = String(label).trim().toLowerCase();
  if (LABEL_TO_MUSTACHE_OVERLAY[normalized]) return LABEL_TO_MUSTACHE_OVERLAY[normalized];
  const ids = MUSTACHE_OVERLAYS.map((x) => x.id);
  const hash = normalized.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return ids[hash % ids.length];
};

const BEARD_OVERLAYS = [
  {
    id: 'full_beard',
    name: 'Full Beard',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120"><path d="M46 34c7 28 30 44 74 44s67-16 74-44c8 8 13 20 13 31 0 28-37 55-87 55S33 93 33 65c0-11 5-23 13-31z" fill="#2b1b12"/><path d="M78 56c9 7 23 11 42 11s33-4 42-11" stroke="#3a2418" stroke-width="6" fill="none" stroke-linecap="round"/></svg>`,
  },
  {
    id: 'short_boxed',
    name: 'Short Boxed',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120"><path d="M58 40c10 18 28 30 62 30s52-12 62-30c8 7 12 16 12 25 0 21-31 40-74 40s-74-19-74-40c0-9 4-18 12-25z" fill="#2f1b0f"/><rect x="88" y="74" width="64" height="20" rx="10" fill="#2a180f"/></svg>`,
  },
  {
    id: 'goatee',
    name: 'Goatee',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120"><path d="M88 46c7 8 18 13 32 13s25-5 32-13c6 5 10 12 10 19 0 11-8 22-20 28v20h-44V93c-12-6-20-17-20-28 0-7 4-14 10-19z" fill="#2b1a10"/></svg>`,
  },
  {
    id: 'circle_beard',
    name: 'Circle Beard',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120"><path d="M86 46c8 7 20 11 34 11s26-4 34-11c7 6 11 13 11 21 0 17-20 31-45 31s-45-14-45-31c0-8 4-15 11-21z" fill="#2e1b11"/><rect x="98" y="69" width="44" height="24" rx="12" fill="#26150d"/></svg>`,
  },
  {
    id: 'stubble',
    name: 'Stubble',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120"><path d="M64 48c10 13 29 22 56 22s46-9 56-22c7 5 11 12 11 18 0 16-30 30-67 30S53 82 53 66c0-6 4-13 11-18z" fill="#4b3a31" opacity="0.65"/></svg>`,
  },
  {
    id: 'anchor',
    name: 'Anchor Beard',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120"><path d="M102 46c5 6 11 9 18 9s13-3 18-9c6 5 10 11 10 18 0 8-5 16-13 22l7 26h-44l7-26c-8-6-13-14-13-22 0-7 4-13 10-18z" fill="#2b1a10"/><path d="M82 86c11 7 24 11 38 11s27-4 38-11" stroke="#2f1b12" stroke-width="6" fill="none" stroke-linecap="round"/></svg>`,
  },
]

const tightenHairSvg = (svg) => {
  if (!svg) return svg;
  if (svg.includes('viewBox="0 0 240 120"')) {
    return svg
      .replace('viewBox="0 0 240 120"', 'viewBox="0 0 240 84" preserveAspectRatio="xMidYMin meet"')
      .replace(/<svg([^>]*?)>/, '<svg$1 style="overflow:visible">');
  }
  return svg;
};

const toDataUrl = (svg) => {
  if (!svg) return '';
  const normalized = String(svg).trim();
  if (!normalized.startsWith('<svg')) return normalized;
  return `data:image/svg+xml;utf8,${encodeURIComponent(tightenHairSvg(normalized))}`;
};
const toBeardDataUrl = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const MODAL_HAIR_URL =
  import.meta.env.VITE_MODAL_HAIR_URL ||
  'https://sarkaranit04--clip-zero-shot-grooming-clipservice-hair-dev.modal.run';

const MODAL_BEARD_URL =
  import.meta.env.VITE_MODAL_BEARD_URL ||
  'https://sarkaranit04--clip-zero-shot-grooming-clipservice-beard.modal.run';

const LABEL_TO_OVERLAY = {
  ariel_sharon: 'buzz',
  colin_powell: 'side_part',
  donald_rumsfeld: 'buzz',
  george_w_bush: 'pompadour',
  gerhard_schroeder: 'fade',
  hugo_chavez: 'curly',
  jacques_chirac: 'slick_back',
  jean_chretien: 'side_part',
  john_ashcroft: 'undercut',
  junichiro_koizumi: 'quiff',
  serena_williams: 'long_wavy',
  tony_blair: 'fringe',
  quiff: 'quiff',
  'hair straiting': 'hair_straiting',
  straiting: 'hair_straiting',
  straightening: 'hair_straiting',
  undercut: 'undercut',
  'slick back': 'slick_back',
  'side part': 'side_part',
  afro: 'afro',
  mohawk: 'mohawk',
  'man bun': 'man_bun',
  'long wavy': 'long_wavy',
  layered: 'layered_wavy_hair',
  'layerd wavy hair': 'layered_wavy_hair',
  'layered wavy hair': 'layered_wavy_hair',
  fringe: 'fringe',
  'wolf cut': 'wolf_cut',
};

const LABEL_TO_BEARD_OVERLAY = {
  ariel_sharon: 'full_beard',
  colin_powell: 'short_boxed',
  donald_rumsfeld: 'stubble',
  george_w_bush: 'goatee',
  gerhard_schroeder: 'short_boxed',
  hugo_chavez: 'full_beard',
  jacques_chirac: 'circle_beard',
  jean_chretien: 'stubble',
  john_ashcroft: 'full_beard',
  junichiro_koizumi: 'anchor',
  tony_blair: 'stubble',
  'full beard': 'full_beard',
  'short boxed': 'short_boxed',
  goatee: 'goatee',
  'circle beard': 'circle_beard',
  stubble: 'stubble',
  anchor: 'anchor',
};

const pickOverlayFromLabel = (label) => {
  if (!label) return null;
  const normalized = String(label).trim().toLowerCase();
  if (LABEL_TO_OVERLAY[normalized]) return LABEL_TO_OVERLAY[normalized];
  const ids = OVERLAYS.map((x) => x.id);
  const hash = normalized.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return ids[hash % ids.length];
};

const pickBeardOverlayFromLabel = (label) => {
  if (!label) return null;
  const normalized = String(label).trim().toLowerCase();
  if (LABEL_TO_BEARD_OVERLAY[normalized]) return LABEL_TO_BEARD_OVERLAY[normalized];
  const ids = BEARD_OVERLAYS.map((x) => x.id);
  const hash = normalized.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return ids[hash % ids.length];
};

const MODAL_MUSTACHE_URL =
  import.meta.env.VITE_MODAL_MUSTACHE_URL ||
  'https://sarkaranit04--clip-zero-shot-grooming-clipservice-mustache.modal.run';

const VirtualTryOn = () => {
    // Mustache overlay state
    const [activeMustacheOverlay, setActiveMustacheOverlay] = useState(MUSTACHE_OVERLAYS[0]);
    const [mustacheOpacity, setMustacheOpacity] = useState(0.8);
    const [mustacheScale, setMustacheScale] = useState(24);
    const [mustacheOffsetX, setMustacheOffsetX] = useState(0);
    const [mustacheOffsetY, setMustacheOffsetY] = useState(6);
    const [mustacheRotation, setMustacheRotation] = useState(0);
    const [showMustache, setShowMustache] = useState(true);
    const [mustacheAiLoading, setMustacheAiLoading] = useState(false);
    const [mustacheAiMessage, setMustacheAiMessage] = useState('');
    const [mustacheAiTopLabel, setMustacheAiTopLabel] = useState('');
    // Dynamic mustache anchor (upper lip). Increased default to sit lower (near upper lip).
    const TRACK_MUSTACHE_BIAS_DEFAULT = 110;
    const [dynamicMustacheBias, setDynamicMustacheBias] = useState(TRACK_MUSTACHE_BIAS_DEFAULT);
    const mustacheOverlayUrl = useMemo(() => `data:image/svg+xml;utf8,${encodeURIComponent(activeMustacheOverlay.svg)}`, [activeMustacheOverlay]);
  const videoRef = useRef(null);
  const previewRef = useRef(null);
  const fileInputRef = useRef(null);
  const streamRef = useRef(null);
  const detectorRef = useRef(null);
  const detectorBackendRef = useRef('none');
  const trackingRafRef = useRef(null);
  const trackingBusyRef = useRef(false);
  const lastDetectTsRef = useRef(0);
  const trackedPoseRef = useRef({ x: 0, y: -55, scale: 100 });
  const [stream, setStream] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraStarting, setCameraStarting] = useState(false);
  const [uploadedSrc, setUploadedSrc] = useState('');
  const [activeOverlay, setActiveOverlay] = useState(OVERLAYS[0]);
  const [activeBeardOverlay, setActiveBeardOverlay] = useState(BEARD_OVERLAYS[0]);
  const [opacity, setOpacity] = useState(0.8);
  const [scale, setScale] = useState(82);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(-62);
  const [rotation, setRotation] = useState(0);
  const [beardOpacity, setBeardOpacity] = useState(0.76);
  const [beardScale, setBeardScale] = useState(56);
  const [beardOffsetX, setBeardOffsetX] = useState(0);
  const [beardOffsetY, setBeardOffsetY] = useState(30);
  const [beardRotation, setBeardRotation] = useState(0);
  const [showBeard, setShowBeard] = useState(true);
  const [autoTrack, setAutoTrack] = useState(true);
  const [trackingStatus, setTrackingStatus] = useState('Idle');
  const [trackedPose, setTrackedPose] = useState({ x: 0, y: -55, scale: 100 });
  const [hairAiLoading, setHairAiLoading] = useState(false);
  const [beardAiLoading, setBeardAiLoading] = useState(false);
  const [hairAiMessage, setHairAiMessage] = useState('');
  const [beardAiMessage, setBeardAiMessage] = useState('');
  const [hairAiTopLabel, setHairAiTopLabel] = useState('');
  const [beardAiTopLabel, setBeardAiTopLabel] = useState('');

  // Extra lift so tracked overlays sit on the hairline, not eyes.
  const TRACK_HAIRLINE_BIAS = 24;
  // Dynamic beard anchor: will be set per-frame based on face height.
  const TRACK_BEARD_BIAS_DEFAULT = 148;
  const [dynamicBeardBias, setDynamicBeardBias] = useState(TRACK_BEARD_BIAS_DEFAULT);

  const overlayUrl = useMemo(() => toDataUrl(activeOverlay.svg), [activeOverlay]);
  const beardOverlayUrl = useMemo(() => toBeardDataUrl(activeBeardOverlay.svg), [activeBeardOverlay]);

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  // --- Mustache positioning/effects that depend on tracking state ---
  const effectiveMustacheScale = autoTrack && cameraOn ? (trackedPose.scale * mustacheScale) / 100 : mustacheScale;
  const effectiveMustacheOffsetX = autoTrack && cameraOn ? trackedPose.x + mustacheOffsetX : mustacheOffsetX;
  const effectiveMustacheOffsetY =
    autoTrack && cameraOn ? trackedPose.y + mustacheOffsetY + dynamicMustacheBias : mustacheOffsetY;
  // --- Dynamic mustache anchor (upper lip, based on face height) ---
  useEffect(() => {
    if (!cameraOn || !autoTrack) return;
    // Base bias moved down; scale still slightly adjusts with face size.
    setDynamicMustacheBias(Math.round(110 + (trackedPose.scale - 100) * 0.7));
  }, [trackedPose, cameraOn, autoTrack]);

  const runMustacheAiRecommendation = async () => {
    await runAiRecommendation({
      endpoint: MODAL_MUSTACHE_URL,
      kind: 'Mustache',
      setLoading: setMustacheAiLoading,
      setMessage: setMustacheAiMessage,
      setTopLabel: setMustacheAiTopLabel,
      pickOverlay: pickMustacheOverlayFromLabel,
      setOverlay: setActiveMustacheOverlay,
      availableOverlays: MUSTACHE_OVERLAYS,
    });
    setShowMustache(true);
  };

  useEffect(() => {
    trackedPoseRef.current = trackedPose;
  }, [trackedPose]);

  useEffect(() => {
    if (!cameraOn || !stream || !videoRef.current) return;

    const video = videoRef.current;
    if (video.srcObject !== stream) {
      video.srcObject = stream;
    }
    video.play().catch(() => {});
  }, [cameraOn, stream]);

  useEffect(() => {
    let cancelled = false;

    const loadDetector = async () => {
      if ('FaceDetector' in window) {
        try {
          detectorRef.current = new window.FaceDetector({
            fastMode: true,
            maxDetectedFaces: 1,
          });
          detectorBackendRef.current = 'native';
          if (!cancelled) setTrackingStatus('Face tracker ready (native)');
          return;
        } catch {
          detectorRef.current = null;
          detectorBackendRef.current = 'none';
        }
      }

      try {
        const vision = await import(
          /* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14'
        );
        const filesetResolver = await vision.FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
        );
        const mpDetector = await vision.FaceDetector.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite',
          },
          runningMode: 'VIDEO',
          minDetectionConfidence: 0.55,
        });

        detectorRef.current = mpDetector;
        detectorBackendRef.current = 'mediapipe';
        if (!cancelled) setTrackingStatus('Face tracker ready (cross-browser)');
      } catch {
        detectorRef.current = null;
        detectorBackendRef.current = 'none';
        if (!cancelled) setTrackingStatus('Face tracking unavailable in this browser');
      }
    };

    loadDetector();

    return () => {
      cancelled = true;
      if (detectorRef.current && detectorBackendRef.current === 'mediapipe') {
        try {
          detectorRef.current.close();
        } catch {
          // no-op
        }
      }
    };
  }, []);

  useEffect(() => {
    const stopLoop = () => {
      if (trackingRafRef.current) {
        cancelAnimationFrame(trackingRafRef.current);
        trackingRafRef.current = null;
      }
    };

    if (!cameraOn || !autoTrack || !videoRef.current || !previewRef.current || !detectorRef.current) {
      stopLoop();
      if (cameraOn && autoTrack && !detectorRef.current) {
        setTrackingStatus('Face tracking unavailable in this browser');
      }
      return stopLoop;
    }

    const tick = () => {
      const video = videoRef.current;
      const preview = previewRef.current;

      if (!video || !preview || !cameraOn || !autoTrack) {
        stopLoop();
        return;
      }

      const now = performance.now();
      const canDetect =
        video.readyState >= 2 &&
        !trackingBusyRef.current &&
        now - lastDetectTsRef.current >= 80;

      if (canDetect) {
        trackingBusyRef.current = true;
        lastDetectTsRef.current = now;

        const runDetection =
          detectorBackendRef.current === 'native'
            ? detectorRef.current.detect(video)
            : Promise.resolve(detectorRef.current.detectForVideo(video, now)?.detections || []);

        runDetection
          .then((faces) => {
            if (!faces?.length) {
              setTrackingStatus((prev) =>
                prev === 'No face detected. Face the camera.' ? prev : 'No face detected. Face the camera.'
              );
              return;
            }

            const firstFace = faces[0];
            const box =
              detectorBackendRef.current === 'native'
                ? firstFace?.boundingBox
                : {
                    x: firstFace?.boundingBox?.originX ?? 0,
                    y: firstFace?.boundingBox?.originY ?? 0,
                    width: firstFace?.boundingBox?.width ?? 0,
                    height: firstFace?.boundingBox?.height ?? 0,
                  };
            if (!box || !video.videoWidth || !video.videoHeight) {
              return;
            }

            const x = box.x ?? box.left ?? 0;
            const y = box.y ?? box.top ?? 0;
            const width = box.width ?? 0;
            const height = box.height ?? 0;

            if (width <= 0 || height <= 0) {
              return;
            }

            const containerW = preview.clientWidth;
            const containerH = preview.clientHeight;
            const videoW = video.videoWidth;
            const videoH = video.videoHeight;

            const drawScale = Math.max(containerW / videoW, containerH / videoH);
            const drawW = videoW * drawScale;
            const drawH = videoH * drawScale;
            const cropX = (drawW - containerW) / 2;
            const cropY = (drawH - containerH) / 2;

            const faceCenterX = (x + width / 2) * drawScale - cropX;
            // Place anchor slightly above the detected face box top to target hairline.
            const foreheadY = (y - height * 0.18) * drawScale - cropY;
            const targetX = faceCenterX - containerW / 2;
            const targetY = foreheadY - containerH / 2;
            const targetScale = clamp(((width * drawScale) / containerW) * 210, 48, 130);

            const prevPose = trackedPoseRef.current;
            const nextPose = {
              x: prevPose.x + (targetX - prevPose.x) * 0.3,
              y: prevPose.y + (targetY - prevPose.y) * 0.3,
              scale: prevPose.scale + (targetScale - prevPose.scale) * 0.28,
            };

            trackedPoseRef.current = nextPose;
            setTrackedPose((prev) => {
              const changed =
                Math.abs(prev.x - nextPose.x) > 0.5 ||
                Math.abs(prev.y - nextPose.y) > 0.5 ||
                Math.abs(prev.scale - nextPose.scale) > 0.4;
              return changed ? nextPose : prev;
            });

            setTrackingStatus((prev) => (prev === 'Tracking face' ? prev : 'Tracking face'));
          })
          .catch(() => {
            setTrackingStatus((prev) =>
              prev === 'Face tracking error. Try reloading page.'
                ? prev
                : 'Face tracking error. Try reloading page.'
            );
          })
          .finally(() => {
            trackingBusyRef.current = false;
          });
      }

      trackingRafRef.current = requestAnimationFrame(tick);
    };

    trackingRafRef.current = requestAnimationFrame(tick);

    return stopLoop;
  }, [cameraOn, autoTrack]);

  const startCamera = async () => {
    if (cameraOn || cameraStarting) return;

    try {
      setCameraStarting(true);

      // Reuse existing stream for near-instant restart.
      if (streamRef.current) {
        streamRef.current.getVideoTracks().forEach((track) => {
          track.enabled = true;
        });
        setStream(streamRef.current);
        setCameraOn(true);
        setUploadedSrc('');
        return;
      }

      const media = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { ideal: 24, max: 30 },
        },
        audio: false,
      });

      streamRef.current = media;
      setUploadedSrc('');
      setStream(media);
      setCameraOn(true);
    } catch (error) {
      alert('Camera access failed. Please allow camera permission or use Upload mode.');
    } finally {
      setCameraStarting(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = false;
      });
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStream(streamRef.current);
    setCameraOn(false);
    setTrackingStatus('Idle');
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const onUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    stopCamera();
    const url = URL.createObjectURL(file);
    setUploadedSrc(url);
  };

  const resetFit = () => {
      setMustacheOpacity(0.8);
      setMustacheScale(24);
      setMustacheOffsetX(0);
      setMustacheOffsetY(6);
      setMustacheRotation(0);
    setOpacity(0.8);
    setScale(82);
    setOffsetX(0);
    setOffsetY(-62);
    setRotation(0);
    setBeardOpacity(0.76);
    setBeardScale(56);
    setBeardOffsetX(0);
    setBeardOffsetY(30);
    setBeardRotation(0);
  };

  const effectiveScale = autoTrack && cameraOn ? (trackedPose.scale * scale) / 100 : scale;
  const effectiveOffsetX = autoTrack && cameraOn ? trackedPose.x + offsetX : offsetX;
  const effectiveOffsetY =
    autoTrack && cameraOn ? trackedPose.y + offsetY - TRACK_HAIRLINE_BIAS : offsetY;
  const effectiveBeardScale =
    autoTrack && cameraOn ? (trackedPose.scale * beardScale) / 100 : beardScale;
  const effectiveBeardOffsetX = autoTrack && cameraOn ? trackedPose.x + beardOffsetX : beardOffsetX;
  const effectiveBeardOffsetY =
    autoTrack && cameraOn
      ? trackedPose.y + beardOffsetY + dynamicBeardBias
      : beardOffsetY;

  const getCurrentImageBlob = async () => {
    if (uploadedSrc) {
      const res = await fetch(uploadedSrc);
      return await res.blob();
    }

    if (cameraOn && videoRef.current && videoRef.current.videoWidth > 0) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      return await new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.92);
      });
    }

    return null;
  };

  const blobToBase64DataUrl = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  const runAiRecommendation = async ({
    endpoint,
    kind,
    setLoading,
    setMessage,
    setTopLabel,
    pickOverlay,
    setOverlay,
    availableOverlays,
  }) => {
    try {
      setLoading(true);
      setMessage(`Calling AI ${kind} model...`);

      const blob = await getCurrentImageBlob();
      if (!blob) {
        setMessage('Please upload an image or start camera first.');
        return;
      }

      const imageBase64 = await blobToBase64DataUrl(blob);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_base64: imageBase64,
          top_k: 3,
        }),
      });

      if (!response.ok) {
        throw new Error(`Modal endpoint failed: ${response.status} ${response.statusText}`);
      }

      const parsed = await response.json();
      // Only select a style if reliability is high
      let top = parsed?.predictions?.find((p) => (p.reliability ?? p.confidence ?? 0) > 0.7);
      if (!top && parsed?.predictions?.length) {
        // fallback: pick the highest reliability
        top = parsed.predictions.reduce((best, cur) => ((cur.reliability ?? cur.confidence ?? 0) > (best.reliability ?? best.confidence ?? 0) ? cur : best), parsed.predictions[0]);
      }
      const topLabel = top?.label;
      const topReliability = top?.reliability ?? top?.confidence;

      if (!topLabel) {
        setMessage(`AI returned no ${kind} prediction. Try a clearer front-face image.`);
        return;
      }

      setTopLabel(topLabel);
      const overlayId = pickOverlay(topLabel);
      const matched = availableOverlays.find((o) => o.id === overlayId);
      if (matched) setOverlay(matched);
      const reliability = topReliability !== undefined ? ` | Reliability: ${topReliability}` : '';
      setMessage(`${kind} prediction: ${topLabel}${reliability}`);
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      const isDevUrl = endpoint.includes('-dev.modal.run');
      const hint = isDevUrl
        ? ' Using a dev URL requires `modal serve clipdeply.py` to be running. For stable use, run `modal deploy clipdeply.py` and use the deployed URL.'
        : '';
      setMessage(`${kind} API request failed: ${detail}.${hint}`);
    } finally {
      setLoading(false);
    }
  };

  const runHairAiRecommendation = async () => {
    await runAiRecommendation({
      endpoint: MODAL_HAIR_URL,
      kind: 'Hair',
      setLoading: setHairAiLoading,
      setMessage: setHairAiMessage,
      setTopLabel: setHairAiTopLabel,
      pickOverlay: pickOverlayFromLabel,
      setOverlay: setActiveOverlay,
      availableOverlays: OVERLAYS,
    });
  };

  const runBeardAiRecommendation = async () => {
    await runAiRecommendation({
      endpoint: MODAL_BEARD_URL,
      kind: 'Beard',
      setLoading: setBeardAiLoading,
      setMessage: setBeardAiMessage,
      setTopLabel: setBeardAiTopLabel,
      pickOverlay: pickBeardOverlayFromLabel,
      setOverlay: setActiveBeardOverlay,
      availableOverlays: BEARD_OVERLAYS,
    });
    setShowBeard(true);
  };

  return (
    <section id="virtual-tryon" className="scroll-mt-28 min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-5">
        <section className="md:col-span-8 rounded-2xl bg-white shadow p-4">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h1 className="text-2xl font-bold text-slate-800">Virtual Hairstyle Try-On</h1>
            <div className="flex gap-2">
              <button
                onClick={cameraOn ? stopCamera : startCamera}
                disabled={cameraStarting}
                className={
                  cameraOn
                    ? 'px-4 py-2 rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-300 disabled:opacity-60'
                    : 'px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700 disabled:opacity-60'
                }
              >
                {cameraStarting ? 'Starting...' : cameraOn ? 'Stop Camera' : 'Start Camera'}
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Upload Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onUpload}
                className="hidden"
              />
            </div>
          </div>

          <div
            ref={previewRef}
            className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden bg-slate-950 aspect-4/5"
          >
                        {/* Mustache overlay */}
                        {(cameraOn || uploadedSrc) && showMustache && (
                          <img
                            src={mustacheOverlayUrl}
                            alt={activeMustacheOverlay.name}
                            className="absolute left-1/2 top-1/2 pointer-events-none select-none"
                            style={{
                              width: `${effectiveMustacheScale}%`,
                              transform: `translate(calc(-50% + ${effectiveMustacheOffsetX}px), calc(-50% + ${effectiveMustacheOffsetY}px)) rotate(${mustacheRotation}deg)`,
                              opacity: mustacheOpacity,
                              filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.28))',
                            }}
                          />
                        )}
            {cameraOn ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : uploadedSrc ? (
              <img src={uploadedSrc} alt="Upload preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300 text-center px-6">
                Start camera or upload a photo to try hairstyles.
              </div>
            )}

            {(cameraOn || uploadedSrc) && (
              <img
                src={overlayUrl}
                alt={activeOverlay.name}
                className="absolute left-1/2 top-1/2 pointer-events-none select-none"
                style={{
                  width: `${effectiveScale}%`,
                  transform: `translate(calc(-50% + ${effectiveOffsetX}px), calc(-50% + ${effectiveOffsetY}px)) rotate(${rotation}deg)`,
                  opacity,
                  filter: 'drop-shadow(0 10px 14px rgba(0,0,0,0.45))',
                }}
              />
            )}

            {(cameraOn || uploadedSrc) && showBeard && (
              <img
                src={beardOverlayUrl}
                alt={activeBeardOverlay.name}
                className="absolute left-1/2 top-1/2 pointer-events-none select-none"
                style={{
                  width: `${effectiveBeardScale}%`,
                  transform: `translate(calc(-50% + ${effectiveBeardOffsetX}px), calc(-50% + ${effectiveBeardOffsetY}px)) rotate(${beardRotation}deg)`,
                  opacity: beardOpacity,
                  filter: 'drop-shadow(0 7px 10px rgba(0,0,0,0.38))',
                }}
              />
            )}
          </div>
        </section>

        <aside className="md:col-span-4 flex flex-col gap-6">
                    {/* Mustache Panel */}
                    <div className="rounded-2xl bg-white shadow p-4">
                      <h2 className="text-lg font-semibold mb-3 text-slate-800">Mustache Controls</h2>
                      <button
                        onClick={runMustacheAiRecommendation}
                        disabled={mustacheAiLoading}
                        className="w-full mb-3 px-3 py-2 rounded-lg bg-yellow-600 text-white hover:bg-yellow-500 disabled:opacity-60"
                      >
                        {mustacheAiLoading ? 'Analyzing Mustache...' : 'Recommend Mustache With AI'}
                      </button>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Mustache Style</label>
                      <select
                        value={activeMustacheOverlay.id}
                        onChange={(e) => {
                          const found = MUSTACHE_OVERLAYS.find((x) => x.id === e.target.value);
                          setActiveMustacheOverlay(found || MUSTACHE_OVERLAYS[0]);
                          setShowMustache(true);
                        }}
                        className="w-full border rounded-lg p-2 mb-4"
                      >
                        {MUSTACHE_OVERLAYS.map((item) => (
                          <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                      </select>
                      <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-3">
                        Show Mustache Overlay
                        <input
                          type="checkbox"
                          checked={showMustache}
                          onChange={(e) => setShowMustache(e.target.checked)}
                          className="h-4 w-4"
                        />
                      </label>
                      <div className="space-y-3">
                        <label className="block text-sm">Mustache Opacity: {mustacheOpacity.toFixed(2)}</label>
                        <input type="range" min="0.2" max="1" step="0.05" value={mustacheOpacity} onChange={(e) => setMustacheOpacity(Number(e.target.value))} className="w-full" />
                        <label className="block text-sm">Mustache Scale: {mustacheScale}%</label>
                        <input type="range" min="12" max="60" step="1" value={mustacheScale} onChange={(e) => setMustacheScale(Number(e.target.value))} className="w-full" />
                        <label className="block text-sm">Mustache Rotate: {mustacheRotation}deg</label>
                        <input type="range" min="-30" max="30" step="1" value={mustacheRotation} onChange={(e) => setMustacheRotation(Number(e.target.value))} className="w-full" />
                        <label className="block text-sm">Mustache Horizontal: {mustacheOffsetX}px</label>
                        <input type="range" min="-60" max="60" step="1" value={mustacheOffsetX} onChange={(e) => setMustacheOffsetX(Number(e.target.value))} className="w-full" />
                        <label className="block text-sm">Mustache Vertical: {mustacheOffsetY}px</label>
                        <input type="range" min="-40" max="60" step="1" value={mustacheOffsetY} onChange={(e) => setMustacheOffsetY(Number(e.target.value))} className="w-full" />
                      </div>
                      {mustacheAiMessage ? (
                        <div className="mt-3 text-sm text-slate-700 bg-slate-100 rounded-lg p-2">{mustacheAiMessage}</div>
                      ) : null}
                      {mustacheAiTopLabel ? (
                        <div className="mt-2 text-xs text-slate-500">Mustache overlay from: {mustacheAiTopLabel}</div>
                      ) : null}
                    </div>
          {/* Hair Panel */}
          <div className="rounded-2xl bg-white shadow p-4">
            <h2 className="text-lg font-semibold mb-3 text-slate-800">Hair Controls</h2>
            <button
              onClick={runHairAiRecommendation}
              disabled={hairAiLoading}
              className="w-full mb-3 px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-60"
            >
              {hairAiLoading ? 'Analyzing Hair...' : 'Recommend Hair With AI'}
            </button>
            <label className="block text-sm font-medium text-slate-700 mb-1">Hair Style</label>
            <select
              value={activeOverlay.id}
              onChange={(e) => {
                const found = OVERLAYS.find((x) => x.id === e.target.value);
                setActiveOverlay(found || OVERLAYS[0]);
              }}
              className="w-full border rounded-lg p-2 mb-4"
            >
              {OVERLAYS.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
            <div className="space-y-3">
              <label className="block text-sm">Opacity: {opacity.toFixed(2)}</label>
              <input type="range" min="0.2" max="1" step="0.05" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full" />
              <label className="block text-sm">Scale: {scale}%</label>
              <input type="range" min="55" max="160" step="1" value={scale} onChange={(e) => setScale(Number(e.target.value))} className="w-full" />
              <label className="block text-sm">Rotate: {rotation}deg</label>
              <input type="range" min="-40" max="40" step="1" value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="w-full" />
              <label className="block text-sm">Horizontal: {offsetX}px</label>
              <input type="range" min="-140" max="140" step="1" value={offsetX} onChange={(e) => setOffsetX(Number(e.target.value))} className="w-full" />
              <label className="block text-sm">Vertical: {offsetY}px</label>
              <input type="range" min="-180" max="60" step="1" value={offsetY} onChange={(e) => setOffsetY(Number(e.target.value))} className="w-full" />
            </div>
            {hairAiMessage ? (
              <div className="mt-3 text-sm text-slate-700 bg-slate-100 rounded-lg p-2">{hairAiMessage}</div>
            ) : null}
            {hairAiTopLabel ? (
              <div className="mt-2 text-xs text-slate-500">Hair overlay from: {hairAiTopLabel}</div>
            ) : null}
          </div>
          {/* Beard Panel */}
          <div className="rounded-2xl bg-white shadow p-4">
            <h2 className="text-lg font-semibold mb-3 text-slate-800">Beard Controls</h2>
            <button
              onClick={runBeardAiRecommendation}
              disabled={beardAiLoading}
              className="w-full mb-3 px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-60"
            >
              {beardAiLoading ? 'Analyzing Beard...' : 'Recommend Beard With AI'}
            </button>
            <label className="block text-sm font-medium text-slate-700 mb-1">Beard Style</label>
            <select
              value={activeBeardOverlay.id}
              onChange={(e) => {
                const found = BEARD_OVERLAYS.find((x) => x.id === e.target.value);
                setActiveBeardOverlay(found || BEARD_OVERLAYS[0]);
                setShowBeard(true);
              }}
              className="w-full border rounded-lg p-2 mb-4"
            >
              {BEARD_OVERLAYS.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
            <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-3">
              Show Beard Overlay
              <input
                type="checkbox"
                checked={showBeard}
                onChange={(e) => setShowBeard(e.target.checked)}
                className="h-4 w-4"
              />
            </label>
            <div className="space-y-3">
              <label className="block text-sm">Beard Opacity: {beardOpacity.toFixed(2)}</label>
              <input type="range" min="0.2" max="1" step="0.05" value={beardOpacity} onChange={(e) => setBeardOpacity(Number(e.target.value))} className="w-full" />
              <label className="block text-sm">Beard Scale: {beardScale}%</label>
              <input type="range" min="35" max="130" step="1" value={beardScale} onChange={(e) => setBeardScale(Number(e.target.value))} className="w-full" />
              <label className="block text-sm">Beard Rotate: {beardRotation}deg</label>
              <input type="range" min="-35" max="35" step="1" value={beardRotation} onChange={(e) => setBeardRotation(Number(e.target.value))} className="w-full" />
              <label className="block text-sm">Beard Horizontal: {beardOffsetX}px</label>
              <input type="range" min="-120" max="120" step="1" value={beardOffsetX} onChange={(e) => setBeardOffsetX(Number(e.target.value))} className="w-full" />
              <label className="block text-sm">Beard Vertical: {beardOffsetY}px</label>
              <input type="range" min="-80" max="160" step="1" value={beardOffsetY} onChange={(e) => setBeardOffsetY(Number(e.target.value))} className="w-full" />
            </div>
            {beardAiMessage ? (
              <div className="mt-3 text-sm text-slate-700 bg-slate-100 rounded-lg p-2">{beardAiMessage}</div>
            ) : null}
            {beardAiTopLabel ? (
              <div className="mt-2 text-xs text-slate-500">Beard overlay from: {beardAiTopLabel}</div>
            ) : null}
          </div>
          {/* General Panel */}
          <div className="rounded-2xl bg-white shadow p-4">
            <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-3">
              Dynamic Face Tracking
              <input
                type="checkbox"
                checked={autoTrack}
                onChange={(e) => setAutoTrack(e.target.checked)}
                className="h-4 w-4"
              />
            </label>
            <div className="text-xs text-slate-500 mb-3">Tracker: {trackingStatus}</div>
            <button
              onClick={resetFit}
              className="w-full mt-2 px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700"
            >
              Reset All Fit
            </button>
            <p className="text-xs text-slate-500 mt-4">
              Tip: In camera mode, keep Dynamic Face Tracking on for auto movement. Sliders become fine-tune offsets.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default VirtualTryOn;
