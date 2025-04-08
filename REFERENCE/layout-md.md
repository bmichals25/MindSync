# MindSync Therapy App - Layout Specifications

## Global Layout Elements

All screens in the MindSync app share these common elements:

- **Status Bar:** Device time, battery, WiFi, and cellular indicators
- **Background:** Light purple gradient (#F0E6FF to #F2E6FD)
- **Home Indicator:** Standard iOS home indicator at bottom of screen
- **Typography System:** SF Pro Display for headings, SF Pro for body text

## Home Screen

### Screen Dimensions
- Full device height (844pt on iPhone 13 Pro)
- Full device width (390pt on iPhone 13 Pro)

### Layout Grid
- Left/right page margin: 32pt
- Card width: 326pt (full width minus margins)
- Vertical spacing between sections: 30pt

### Layout Elements (Top to Bottom)

1. **Greeting Section** (Y: 60-190)
   - Top Margin: 60pt
   - "How are you feeling, Alex?" text
   - Typography: SF Pro Display, 38pt, Extra Bold, -0.5pt letter spacing
   - Width: 326pt
   - Text color: #1A1A1A

2. **Mood Check-In Card** (Y: 230-360)
   - Width: 326pt
   - Height: 130pt
   - Corner Radius: 30pt
   - Background: White
   - Content:
     * Sun icon (centered, Y:280)
     * "Mood Check-In" text (Y:330)
     * Typography: SF Pro Display, 24pt, Semibold

3. **Talk to Therapist Button** (Y: 380-450)
   - Width: 326pt
   - Height: 70pt
   - Corner Radius: 35pt
   - Background: Purple-to-pink gradient
   - Text: "Talk to Therapist"
   - Typography: SF Pro Display, 20pt, Semibold, White

4. **Recent Sessions Section** (Y: 480-720)
   - Section Title: "Recent Sessions" (Y:500)
   - Typography: SF Pro Display, 22pt, Bold
   - Session Cards:
     * Width: 326pt
     * Height: 90pt each
     * Corner Radius: 20pt
     * Vertical spacing between cards: 20pt
     * Content padding: 18pt
     * Title: SF Pro Display, 18pt, Semibold
     * Subtitle: SF Pro, 18pt, Regular

5. **Bottom Navigation** (Y: 750-844)
   - Width: Full screen
   - Height: 94pt
   - Background: White
   - Icons: 23pt diameter
   - Icon Labels: SF Pro, 12pt, Regular
   - Home Indicator: 5pt height, 140pt width

## Chat Interface

### Layout Grid
- Left margin for AI messages: 24pt
- Right margin for user messages: 24pt
- Vertical spacing between messages: 10pt

### Layout Elements (Top to Bottom)

1. **Header Bar** (Y: 47-107)
   - Back Button: 25pt radius circle, left aligned at X:35
   - App Logo: 20pt radius circle, X:95
   - App Name: SF Pro Display, 17pt, Semibold
   - Mode Toggle: 100pt width, 30pt height, 15pt radius

2. **Message Area** (Y: 107-740)
   - AI Message Bubbles:
     * Left aligned with 24pt margin
     * Width: Up to 260pt
     * Corner Radius: 24pt
     * Padding: 20pt
     * Text: SF Pro, 16pt, Regular
     * Timestamp: SF Pro, 12pt, Regular, Gray (#6B7280)
   
   - User Message Bubbles:
     * Right aligned with 24pt margin
     * Width: Up to 260pt
     * Corner Radius: 24pt
     * Padding: 20pt
     * Text: SF Pro, 16pt, Regular, White
     * Timestamp: SF Pro, 12pt, Regular, White (80% opacity)
   
   - Typing Indicator:
     * Width: 100pt
     * Height: 44pt
     * Corner Radius: 22pt

3. **Input Area** (Y: 750-844)
   - Background: White
   - Input Field:
     * Left margin: 24pt
     * Width: 290pt
     * Height: 44pt
     * Corner Radius: 22pt
     * Background: #F0F0F0
   - Send Button:
     * Radius: 28pt
     * Position: X:350, Y:797

## Session Recap Screen

### Layout Elements (Top to Bottom)

1. **Header** (Y: 47-107)
   - Title: "Session Summary" (centered)
   - Typography: SF Pro Display, 20pt, Semibold
   - Back Button: 25pt radius, X:35
   - Share Button: 25pt radius, X:355

2. **Session Info Card** (Y: 110-220)
   - Width: 342pt
   - Corner Radius: 24pt
   - Padding: 20pt
   - Content:
     * Date: SF Pro, 14pt, Semibold, Purple (#9B81F8)
     * Title: SF Pro Display, 20pt, Semibold
     * Duration: SF Pro, 16pt, Regular
     * Mode Indicator: Icon + "Voice Mode" text

3. **Mood Tracking Card** (Y: 230-340)
   - Width: 342pt
   - Corner Radius: 24pt
   - Content:
     * Card Title: "Mood Tracking", SF Pro, 16pt, Semibold
     * Before Mood: Soft red pill, 110pt width
     * After Mood: Soft green pill, 110pt width
     * Improvement Indicator: 22pt radius circle

4. **Session Summary Card** (Y: 350-480)
   - Width: 342pt
   - Corner Radius: 24pt
   - Content:
     * Card Title: "Session Summary"
     * Summary Text: SF Pro, 16pt, Regular, Gray

5. **Action Items Card** (Y: 490-670)
   - Width: 342pt
   - Action Items:
     * 44pt height each
     * 8pt corner radius
     * Light gray background (#F9FAFB)
     * Checkbox/circle: 9pt radius
     * Text: SF Pro, 15pt, Regular

6. **Action Buttons** (Y: 680-730)
   - Primary Button:
     * Width: 165pt
     * Height: 50pt
     * Corner Radius: 25pt
     * Text: SF Pro, 16pt, Semibold, White
   - Secondary Button:
     * Width: 165pt
     * Height: 50pt
     * Corner Radius: 25pt
     * Text: SF Pro, 16pt, Semibold, Gray

7. **Bottom Navigation** (Y: 750-844)
   - Same structure as Home Screen
   - Active Tab: Insights (middle)

## Voice Mode Screen

### Layout Elements

1. **Status Area** (Y: 47-120)
   - Back Button: 24pt radius circle
   - "LISTENING" pill: 120pt width, 36pt height
   - Timer: SF Pro, 16pt, Medium, White (70% opacity)

2. **Visualization Area** (Y: 120-500)
   - Centered animated orb
   - Multiple concentric circles with varying opacity
   - Radiating sound waves (animated)

3. **Control Buttons** (Y: 580-630)
   - Three circular buttons:
     * Back 15 Seconds: 36pt radius
     * Pause: 46pt radius
     * Forward 15 Seconds: 36pt radius
   - Button Labels: Below each button, SF Pro, 13pt

4. **End Session Button** (Y: 670-714)
   - Width: 120pt
   - Height: 44pt
   - Corner Radius: 22pt
   - Text: "End Session"
   - Typography: SF Pro, 15pt, Semibold, White

5. **Bottom Navigation** (Y: 750-844)
   - Same structure as other screens
   - Active Tab: Voice (middle)