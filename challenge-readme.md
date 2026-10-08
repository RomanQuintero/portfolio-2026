# 30 Projects

A collection of 30 small projects exploring software engineering,
artificial intelligence, computer systems and hardware.

The goal is to build, experiment and learn through small, self-contained
projects covering different technologies and ideas.

| # | Project | Description | Tech |
|---|---------|-------------|------|
| 01 | [Screen Watcher](https://github.com/RomanQuintero/screen-watcher) | Local desktop application that detects visual changes and builds a semantic history of screen activity. | Python · PyTorch · Qwen3-VL · DXcam · Tkinter |
| 02 | [TinyDB](https://github.com/RomanQuintero/tinydb) | Key-value database built from scratch to explore indexing, append-only storage and log compaction through benchmarks. | C++ · CMake · Binary Storage · Hash Indexing |
| 03 | [Kafka Market Stream](https://github.com/RomanQuintero/kafka-market-stream) | Real-time market data pipeline that streams Binance trades through Kafka to independent consumers and a live dashboard. | Java · Kafka · Docker · React · TypeScript · SSE |
| 04 | [Unity vs Unreal Face AR](https://github.com/RomanQuintero/unity-vs-unreal-face-ar) | One-day experiment comparing Unity and Unreal Engine by building the same Android face-tracking AR experience. | Unity · Unreal Engine · Android · ARCore · Face Tracking |
| 05 | [Local Academic RAG](https://github.com/RomanQuintero/local-academic-rag) | Local RAG system with structure-aware retrieval, grounded generation and traceable sources over academic documents. | Python · BGE-M3 · Qwen3 · Ollama · FastAPI · Spring Boot |
| 06 | [Adaptive Edge-Cloud Inference](https://github.com/RomanQuintero/adaptive-edge-cloud-inference) | Adaptive vision system where global Cloud detections guide local Edge attention, reducing remote inference calls by 71% and transferred data by 74% in a reproducible video benchmark. | Kotlin · Android · TFLite · Python · FastAPI · PyTorch · CUDA |
| 07 | [Personal Web Search](https://github.com/RomanQuintero/personal-web-search) | From-scratch web search engine with controlled crawling, an inverted index and BM25 ranking, revisiting a personal search engine project from 2022. | Java · Jsoup · BM25 · Information Retrieval |
| 08 | [GLB Stress Lab](https://github.com/RomanQuintero/glb-stress-lab) | Browser performance experiment comparing main-thread and Web Worker GLB loading, measuring responsiveness, blocking time and time to first rendered frame across increasingly large 3D assets. | JavaScript · Three.js · Web Workers · WebGL · Performance API |
| 09 | [Desktop Dragon](https://github.com/RomanQuintero/desktop-dragon) | Persistent Windows desktop pet with global eye tracking, direct interaction and a lightweight Tamagotchi-style state that continues evolving while the application is closed. | C# · .NET 8 · WPF · Win32 · JSON |
| 10 | [Portfolio 2026](https://github.com/RomanQuintero/portfolio-2026) | Personal portfolio built as Stage I of the 30 Projects challenge, combining selected engineering case studies with a README-driven challenge tracker that updates as new projects are released. | Next.js · React · TypeScript · Tailwind CSS · Motion |
| 11 | [Cellular Radar for AOSP](https://github.com/RomanQuintero/aosp-cellular-radar) | Native Android 17 Settings extension for inspecting framework-reported cellular information, including serving and observed cells, network identity, radio technology, frequency and signal metrics. Built directly into AOSP and validated on Cuttlefish. | Java · AOSP · Android Telephony · Cuttlefish · Soong · Robolectric |
| 12 | [Agentic Visual QA](https://github.com/RomanQuintero/agentic-visual-qa) | Autonomous black-box web QA system combining deterministic browser checks, LLM-driven semantic exploration and VLM screenshot perception, with validated execution, replay and evidence-based defect reporting. | Python · Playwright · Qwen3-VL · PyTorch · Transformers |
| 13 | [CUDA Vision Bench](https://github.com/RomanQuintero/cuda-vision-bench) | Custom CUDA Gaussian Blur benchmark comparing naive and shared-memory tiled kernels against OpenCV CPU and OpenCV CUDA. Separates kernel-only from end-to-end performance to expose the impact of GPU memory transfers. | CUDA C++ · OpenCV CUDA · CMake · NVIDIA RTX 3090 |
| 14 | [Crypto Strength Bench](https://github.com/RomanQuintero/crypto-strength-bench) | Visual cryptography benchmark measuring real CPU and RTX 3090 CUDA SHA-256 throughput, then extrapolating exhaustive-search times across increasingly large key spaces. Includes matched CPU/GPU comparison, PBKDF2 and controlled synthetic secret recovery. | CUDA C++ · Web Crypto · Node.js · JavaScript · NVIDIA RTX 3090 |
| 15 | [RING — FPGA vs STM32](https://github.com/RomanQuintero/ring-fpga-vs-stm32) | Hardware-in-the-loop Pong experiment comparing FPGA and STM32 controllers under the same Windows-hosted physics and serial protocol. Implements a quantized neural-network policy in SystemVerilog on an Arty A7-35T and a FreeRTOS controller on STM32, with real-time dual-UART telemetry and physical hardware execution. | SystemVerilog · FPGA · STM32 · FreeRTOS · C# · Python · Vivado |
| 16 | [PUSHLESS](https://github.com/RomanQuintero/pushless) | Experimental Android benchmark exploring how far self-hosted push notifications can work without Firebase or another push provider. Compares WebSocket, MQTT, periodic polling and foreground-service delivery across background, screen-off, Doze, network-loss and process-death conditions on a physical Android device. | Kotlin · Android · Python · WebSocket · MQTT · JobScheduler · ADB |
| 17 | [Quant Ladder](https://github.com/RomanQuintero/quant-ladder) | Quantization benchmark mapping the speed, efficiency and quality trade-off of Qwen3-8B from F16 down to Q2_K on an RTX 3090. Measures throughput, VRAM, energy, perplexity, KL divergence and GSM8K accuracy, identifying Q4_K_M as the compression knee. | llama.cpp · GGUF · CUDA · Python · NVML · NVIDIA RTX 3090 |
| 18 | [Pocket LLama](https://github.com/RomanQuintero/pocket-llama) | On-device LLM experiment measuring how large a model a physical Android phone can run before it stops being interactive. Runs Qwen3 0.6B–8B (Q4_K_M) through llama.cpp via NDK/JNI on a Galaxy Z Fold6 CPU, fully offline, recording load time, prefill/decode throughput, memory and thermal throttling to separate fits, usable and interactive. | Kotlin · Android NDK · JNI · C++ · llama.cpp · GGUF · ARM64 |
| 19 | [Voice Ladder](https://github.com/RomanQuintero/voice-ladder) | Local zero-shot voice-cloning benchmark measuring how much reference audio a cloner needs to sound like the speaker. Climbs a 3 s → 5 min reference ladder for XTTS-v2, Chatterbox Multilingual and F5-TTS (Spanish) on an RTX 3090 using Multilingual LibriSpeech readers, scoring ECAPA speaker similarity, Whisper ΔWER, DNSMOS, RTF and VRAM. Finds that raw audio plateaus after ~10 s, while picking the best 10 s window from 5 min lifts similarity to 0.775 (ceiling 0.904). | Python · PyTorch · CUDA · XTTS-v2 · Chatterbox · F5-TTS · SpeechBrain · Whisper · NVIDIA RTX 3090 |
| 20 | — | — | — |
| ... | ... | ... | ... |
| 30 | — | — | — |

## Approach

Each project focuses on a specific idea or technical question.

Projects may vary in scope and complexity, but each one aims to reach a
working prototype, document the results and identify possible future work.

