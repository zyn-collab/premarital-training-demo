# Implementation Plan: 6-Course Premarital Education Platform

## Executive Summary

Transform the existing single-course demo into a complete 6-course platform with:
- **6 Courses**: 210 total slides, ~6 hours of content
- **Course Selection Screen**: Allow users to navigate between courses
- **Overall Progress Tracking**: Track completion across all 6 courses
- **Certificate Readiness**: Show overall 2/6, 3/6, etc. progress

---

## Course Overview

| Course | Title | Duration | Slides | Status |
|--------|-------|----------|--------|--------|
| 1 | Foundations of Partnership | 60 min | 28 | ⬜ To Build |
| 2 | Communication & Planning Together | 75 min | 50 | ✅ Complete |
| 3 | Health & Intimacy | 60 min | 32 | ⬜ To Build |
| 4 | Financial Partnership | 60 min | 30 | ⬜ To Build |
| 5 | Building Safe Home & Navigating Systems | 70 min | 38 | ⬜ To Build |
| 6 | Parenting & Child Well-Being | 60 min | 32 | ⬜ To Build |
| **TOTAL** | | **6 hrs** | **210** | **1/6 Complete** |

---

## Architectural Approach

### Option A: Separate Course Data Files (RECOMMENDED) ✅

**Structure:**
```
src/
├── data/
│   ├── courses/
│   │   ├── course1.json
│   │   ├── course2.json (existing courseData.json)
│   │   ├── course3.json
│   │   ├── course4.json
│   │   ├── course5.json
│   │   └── course6.json
│   └── coursesMetadata.json (course list)
├── components/
│   ├── CourseSelection.jsx (NEW)
│   ├── CertificateProgress.jsx (NEW)
│   └── ... (existing components)
└── App.jsx (MAJOR UPDATE)
```

**Why This Approach:**
- ✅ Clean separation of concerns
- ✅ Each course independently maintainable
- ✅ Smaller file sizes (better performance)
- ✅ Matches material structure
- ✅ Easy to add/update individual courses
- ✅ Simple URL routing (/course/1, /course/2, etc.)

---

## Implementation Steps

### Phase 1: Architecture Setup (1-2 hours)

1. **Create Course Routing System**
   - Add React Router for URL-based navigation
   - Routes: `/` (home/course selection), `/course/:id` (individual course)

2. **Update localStorage System**
   ```javascript
   // Current: stores single currentSlide
   // New: stores per-course progress
   {
     "course_1_progress": { currentSlide: 15, completed: false },
     "course_2_progress": { currentSlide: 50, completed: true },
     "course_3_progress": { currentSlide: 1, completed: false },
     ...
   }
   ```

3. **Create Course Metadata File**
   ```json
   {
     "courses": [
       {
         "id": 1,
         "title": "Foundations of Partnership",
         "duration": "60 minutes",
         "totalSlides": 28,
         "description": "...",
         "icon": "🤝"
       },
       ...
     ]
   }
   ```

### Phase 2: Build Course Selection Screen (1 hour)

**Components to Create:**
- `CourseSelection.jsx`: Main landing page
- `CourseCard.jsx`: Individual course cards with progress indicators
- `CertificateProgress.jsx`: Overall progress banner (X/6 complete)

**Features:**
- Show all 6 courses as cards
- Display progress for each course (Not Started / In Progress X% / Completed ✓)
- Show overall certificate progress
- "Continue" or "Start" buttons based on status

### Phase 3: Generate Course Data Files (4-6 hours)

**Priority Order:**
1. ✅ Course 2 (already complete)
2. Course 1 - Foundations (28 slides) - IMPORTANT: Must come first in user journey
3. Course 3 - Health & Intimacy (32 slides)
4. Course 4 - Financial Partnership (30 slides)
5. Course 5 - Safe Home & Systems (38 slides)
6. Course 6 - Parenting (32 slides)

**For Each Course:**
- Parse material specification file
- Generate JSON structure matching Course 2 format
- Validate all slide types are supported
- Test in app

### Phase 4: Update Existing Components (2 hours)

**App.jsx:**
- Add routing logic
- Load course based on URL parameter
- Pass course ID to all components

**ProgressBar.jsx:**
- Show course number (Course 1/6, Course 2/6, etc.)
- Add "Back to Courses" button

**Navigation.jsx:**
- On completion, offer "Next Course" or "Back to Courses"

**InfoModal.jsx:**
- Update to be course-specific (different demo answers per course)

### Phase 5: Testing & Polish (1-2 hours)

- Test all 6 courses end-to-end
- Verify progress tracking works correctly
- Test Reset Demo per course vs. Reset All
- Ensure all checkpoints validate correctly
- Test navigation between courses

---

## File Changes Required

### New Files:
- `src/components/CourseSelection.jsx`
- `src/components/CertificateProgress.jsx`
- `src/components/CourseCard.jsx`
- `src/data/coursesMetadata.json`
- `src/data/courses/course1.json`
- `src/data/courses/course3.json`
- `src/data/courses/course4.json`
- `src/data/courses/course5.json`
- `src/data/courses/course6.json`

### Updated Files:
- `src/App.jsx` - Add routing, multi-course support
- `src/utils/localStorage.js` - Per-course progress tracking
- `src/components/ProgressBar.jsx` - Show course X/6
- `src/components/Navigation.jsx` - Add course navigation
- `src/components/InfoModal.jsx` - Course-specific demo answers
- `package.json` - Add react-router-dom

### Renamed Files:
- `src/data/courseData.json` → `src/data/courses/course2.json`

---

## localStorage Schema

```javascript
// Before (single course):
{
  "currentSlide": 25,
  "checkpoint_5": "answer",
  "checkpoint_5_passed": "true"
}

// After (multi-course):
{
  "currentCourse": 2,
  "courses": {
    "1": {
      "currentSlide": 28,
      "completed": true,
      "checkpoints": {
        "1": { "answer": "...", "passed": true }
      }
    },
    "2": {
      "currentSlide": 35,
      "completed": false,
      "checkpoints": {
        "5": { "answer": "...", "passed": true },
        "8": { "answer": "...", "textAnswer": "...", "passed": true }
      }
    }
  }
}
```

---

## New Dependencies

```json
{
  "react-router-dom": "^6.22.0"
}
```

---

## Course Generation Strategy

### Option 1: Manual JSON Creation (RELIABLE)
- Read material specification
- Copy slide-by-slide into JSON format
- Time per course: ~45-60 minutes
- **Total time: 4-5 hours for all 5 courses**
- Pros: Full control, guaranteed accuracy
- Cons: Time-intensive, manual work

### Option 2: Python Script Generation (FASTER)
- Create Python script to parse material file
- Auto-generate JSON for each course
- Time: 1 hour to write script + testing
- **Total time: 2-3 hours for all 5 courses**
- Pros: Faster, repeatable, less error-prone
- Cons: Requires parsing logic, validation needed

**RECOMMENDATION: Use Python script** (similar to generate_course2.py)
- We already have successful experience with Course 2
- Can reuse/adapt existing script
- Faster and more reliable for 5 courses

---

## Timeline Estimate

| Phase | Task | Time |
|-------|------|------|
| 1 | Architecture Setup | 2 hrs |
| 2 | Course Selection UI | 1 hr |
| 3a | Generate Course 1 JSON | 45 min |
| 3b | Generate Course 3 JSON | 45 min |
| 3c | Generate Course 4 JSON | 45 min |
| 3d | Generate Course 5 JSON | 45 min |
| 3e | Generate Course 6 JSON | 45 min |
| 4 | Update Components | 2 hrs |
| 5 | Testing & Polish | 1.5 hrs |
| **TOTAL** | | **~10 hours** |

---

## Risks & Mitigation

### Risk 1: Breaking Existing Course 2
**Mitigation:**
- Keep courseData.json backup
- Test Course 2 thoroughly after architecture changes
- Use Git branches

### Risk 2: Course Data Generation Errors
**Mitigation:**
- Validate against schema
- Test each course individually before integrating
- Use TypeScript interfaces for validation

### Risk 3: localStorage Compatibility
**Mitigation:**
- Write migration function for existing progress
- Keep backward compatibility for demo users

---

## Success Criteria

✅ All 6 courses load and display correctly
✅ Users can navigate between courses
✅ Progress tracking works per-course and overall
✅ Certificate progress shows X/6 completion
✅ All checkpoints validate correctly
✅ Demo answers work for all courses
✅ Reset Demo works per-course
✅ Navigation is intuitive and smooth
✅ Production build succeeds
✅ No regression in Course 2 functionality

---

## Future Enhancements (Post-MVP)

- PDF certificate generation
- Course completion timestamps
- Export marital agreement template
- Multi-language support (Dhivehi)
- Facilitator mode
- Analytics/tracking
- Backend integration for real deployment

---

## Questions for User

Before proceeding with implementation, please confirm:

1. **Architecture Choice**: Approve Option A (separate course files + routing)?
2. **Course Generation**: Use Python script or manual JSON creation?
3. **Priority**: Build all 6 courses at once, or course-by-course?
4. **URL Structure**: `/course/1` or `/foundations-of-partnership`?
5. **Reset Behavior**: Reset individual course or reset all courses?

---

## Next Steps

Once plan is approved:
1. ✅ Install react-router-dom
2. ✅ Create course metadata file
3. ✅ Build CourseSelection component
4. ✅ Update App.jsx with routing
5. ✅ Generate Course 1-6 JSON files
6. ✅ Update localStorage utilities
7. ✅ Test and polish
8. ✅ Build and deploy

---

*Plan created: 2025-12-09*
*Estimated completion: 1-2 days of focused work*
