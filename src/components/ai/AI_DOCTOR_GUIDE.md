# AI Doctor Real-Time Conversation Flow

## How It Works

### 1. **User Opens Modal**
   - Click "Open AI Doctor" button on any page
   - Modal pops up with welcome screen
   - Doctor avatar (idle video) greets the user

### 2. **Start Consultation**
   - User clicks "Start consultation"
   - Doctor begins asking questions one at a time
   - Each question is displayed in the input field

### 3. **User Responds**
   - **Option A: Speak**
     - Tap the microphone icon
     - Speak your answer clearly
     - Speech is automatically transcribed to text
   - **Option B: Type**
     - Type your answer directly in the text field
     - Edit as needed

### 4. **Submit Answer**
   - Click "Submit" button
   - The doctor follows a smooth conversation flow:

   **State Transitions:**
   - **Idle → Listening (0.8s)**
     - Avatar shows listening video
     - This happens as you submit
   
   - **Listening → Thinking**
     - Avatar transitions to thinking video
     - System is processing your answer
   
   - **Thinking → Calling Gemini API**
     - Gemini receives your answer + question + context
     - Generates a personalized response
   
   - **Thinking → Speaking**
     - Avatar switches to speaking video (plays silently)
     - Text-to-speech converts response to audio
     - Doctor's voice speaks the response in real-time
   
   - **Speaking → Idle**
     - When speech finishes
     - Avatar returns to idle
     - The next question appears automatically

   **Greeting Behavior:**
   - The welcome greeting is spoken only once at the start of the consultation
   - After that, the doctor continues with the next question naturally
   - The greeting does not repeat after every answer

### 5. **Real-Time Synchronization**
   - **Silent Video + Spoken Audio** = Illusion of doctor actually speaking
   - Video timing doesn't need to match speech perfectly (silent videos work)
   - Speech is natural and conversational thanks to text-to-speech

### 6. **Conversation Flow**
   - Questions asked sequentially: one at a time
   - Each answer saved to patient profile
   - Doctor learns from previous answers
   - Context improves response quality

### 7. **Completion**
   - After all questions answered
   - Doctor summarizes the consultation
   - Shows completion screen
   - Option to close and resume anytime

## Required Assets

Place these video files:

```
src/assets/ai/doctor/
├── idle/idle.mp4              (loops, doctor waiting)
├── listening/listening.mp4    (loops, patient speaking)
├── thinking/thinking.mp4      (loops, AI processing)
├── speaking/speaking.mp4      (plays once, doctor responding)
└── completed/completed.mp4    (plays once, consultation done)
```

**Video Specs:**
- Format: MP4 (H.264 video codec)
- Aspect Ratio: Square (1:1)
- Resolution: 512×512 or 1024×1024
- Duration: 2-4 seconds (looping states)
- Important: **Keep videos SILENT** (no audio track)
- The text-to-speech provides all audio

## Configuration

### Add Gemini API Key
1. Click the ⚙️ settings button in the modal
2. Paste your Gemini API key
3. Click "Save"
4. Conversation will now use real AI responses

### Without API Key
- Modal still works
- Falls back to local placeholder responses
- Good for testing UI/flow

## Technical Stack

- **React + TypeScript**
- **Speech Recognition API** (Browser microphone input)
- **Web Speech Synthesis API** (Text-to-speech)
- **Gemini 2.0 Flash API** (AI responses)
- **LocalStorage** (Data persistence)
- **Framer Motion** (Smooth animations)

## State Management

```
User Input
    ↓
Submit Answer
    ↓
idle → listening → thinking
    ↓
Call Gemini API
    ↓
Receive Response
    ↓
thinking → speaking
    ↓
Play Video + Speech
    ↓
speaking → idle
    ↓
Next Question
```

## Browser Compatibility

✅ Chrome/Chromium (best support)
✅ Edge
✅ Firefox
✅ Safari (with limitations)
⚠️ Mobile browsers (tap to enable audio)

## Tips for Best Experience

1. **Video Duration:** Make speaking video 3-5 seconds (long enough to feel natural)
2. **Microphone:** Use a quiet environment for better speech recognition
3. **Speech Rate:** Set to 0.95 in speech service (slightly slower, clearer)
4. **Mobile:** Tap "Tap to speak" button for best results
