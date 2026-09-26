# Testing Guide

## Pre-Testing Checklist

Before running tests, ensure:
- [ ] Backend server is running on http://localhost:5000
- [ ] Frontend dev server is running on http://localhost:5173
- [ ] Gemini API key is correctly set in `server/.env`
- [ ] Browser developer console is open to check for errors

## Test Cases

### Test 1: Valid Product Generation ✅

**Steps:**
1. Enter Product Name: `Wireless Bluetooth Headphones`
2. Select Category: `Electronics`
3. Click "Generate Details"

**Expected Results:**
- Loading spinner appears with "Generating product details..." message
- Button becomes disabled and shows "Generating..."
- After 2-5 seconds, product card appears with:
  - A professional product title
  - A 2-3 sentence description
  - 5-8 keyword tags
  - "AI Generated" badge at the top

**Success Criteria:**
- ✅ No console errors
- ✅ Product card displays properly
- ✅ All fields are populated
- ✅ Tags are clickable with hover effect

---

### Test 2: Empty Product Name Validation ❌

**Steps:**
1. Leave Product Name field empty
2. Select Category: `Electronics`
3. Click "Generate Details"

**Expected Results:**
- Red error message appears: "Please enter a product name"
- No API request is made
- Product card remains in empty state

**Success Criteria:**
- ✅ Error message is displayed
- ✅ No network request in browser DevTools
- ✅ Button is still enabled after validation failure

---

### Test 3: Empty Category Validation ❌

**Steps:**
1. Enter Product Name: `Smart Watch`
2. Leave Category dropdown on "Select a category"
3. Click "Generate Details"

**Expected Results:**
- Red error message appears: "Please select a category"
- No API request is made
- Product card remains in empty state

**Success Criteria:**
- ✅ Error message is displayed
- ✅ No network request in browser DevTools
- ✅ Form remains editable

---

### Test 4: Loading State

**Steps:**
1. Enter Product Name: `Running Shoes`
2. Select Category: `Sports`
3. Click "Generate Details"
4. Observe the UI immediately

**Expected Results:**
- Button text changes to "Generating..." with spinner icon
- Button becomes disabled (cannot click again)
- Product card shows loading spinner with message
- Previous product card (if any) is replaced with loading state

**Success Criteria:**
- ✅ Button is disabled during loading
- ✅ Loading spinner is visible
- ✅ Cannot trigger multiple simultaneous requests
- ✅ Loading state is visually clear

---

### Test 5: Multiple Rapid Clicks Prevention

**Steps:**
1. Enter Product Name: `Coffee Maker`
2. Select Category: `Home & Kitchen`
3. Click "Generate Details" multiple times rapidly

**Expected Results:**
- Only one API request is made (check Network tab)
- Button disables after first click
- UI handles subsequent clicks gracefully

**Success Criteria:**
- ✅ Only 1 POST request to `/api/generate-product` in Network tab
- ✅ No duplicate requests
- ✅ No errors in console

---

### Test 6: API Error Handling

**Steps:**
1. Stop the backend server
2. Enter valid product name and category
3. Click "Generate Details"

**Expected Results:**
- Loading state appears initially
- After request fails, error message appears:
  - "Something went wrong. Please try again."
- Product card returns to empty state or shows previous product
- Button becomes enabled again

**Success Criteria:**
- ✅ User-friendly error message (not technical details)
- ✅ No exposed backend errors or stack traces
- ✅ Button is re-enabled after error
- ✅ User can retry the operation

---

### Test 7: Different Product Categories

**Test each category:**

| Product Name | Category | Expected |
|--------------|----------|----------|
| Summer Dress | Fashion | Fashion-related content |
| Face Cream | Beauty | Beauty-related content |
| Cookbook | Books | Book-related content |
| Yoga Mat | Sports | Sports-related content |
| Leather Wallet | Accessories | Accessory-related content |
| Custom Item | Other | Generic product content |

**Success Criteria:**
- ✅ All categories work correctly
- ✅ Generated content is relevant to the category
- ✅ No errors for any category

---

### Test 8: Responsive Design - Desktop

**Screen Size:** 1920x1080 (or larger)

**Expected Layout:**
- Two-column layout
- Form on the left
- Product card on the right (sticky position)
- Proper spacing and alignment
- No horizontal scrolling

**Success Criteria:**
- ✅ Content is well-proportioned
- ✅ No layout breaks
- ✅ Hover effects work smoothly

---

### Test 9: Responsive Design - Tablet

**Screen Size:** 768px width (use browser DevTools)

**Steps:**
1. Open browser DevTools (F12)
2. Toggle device toolbar
3. Select iPad or set width to 768px
4. Test the application

**Expected Layout:**
- Single-column layout (stacked)
- Form appears first
- Product card below form
- All elements readable
- Touch-friendly button sizes

**Success Criteria:**
- ✅ Layout stacks vertically
- ✅ No overlapping elements
- ✅ Text remains readable
- ✅ Buttons are easily tappable

---

### Test 10: Responsive Design - Mobile

**Screen Size:** 375px width (iPhone SE / similar)

**Steps:**
1. Set browser DevTools to mobile view (375px width)
2. Test all functionality

**Expected Layout:**
- Single-column layout
- Compact spacing
- Full-width form inputs
- Readable font sizes (no zoom on input focus)
- Product card fits screen

**Success Criteria:**
- ✅ No horizontal scrolling
- ✅ All text is readable without zooming
- ✅ Form inputs don't cause zoom on focus
- ✅ Product card displays properly
- ✅ Tags wrap to multiple lines if needed

---

### Test 11: Product Card Visual Design

**Focus Areas:**
- Professional appearance
- Clear visual hierarchy
- Proper spacing
- Smooth animations
- Hover effects on tags

**Success Criteria:**
- ✅ Card has rounded corners and shadow
- ✅ "AI Generated" badge is visible
- ✅ Title is prominent and bold
- ✅ Description is easy to read
- ✅ Tags have hover effects
- ✅ Overall design looks polished

---

### Test 12: Accessibility

**Keyboard Navigation:**
1. Use Tab key to navigate through form
2. Use Enter to submit form
3. Check focus indicators

**Expected:**
- Tab order is logical (Product Name → Category → Button)
- Focus indicators are visible
- Form can be submitted with Enter key
- Screen reader labels are present

**Success Criteria:**
- ✅ All interactive elements are keyboard accessible
- ✅ Clear focus indicators
- ✅ Form labels are properly associated
- ✅ ARIA attributes where appropriate

---

### Test 13: Re-generation

**Steps:**
1. Generate a product successfully
2. Change product name to something different
3. Click "Generate Details" again

**Expected Results:**
- Old product card is replaced with loading state
- New product details are generated
- No remnants of previous product

**Success Criteria:**
- ✅ Previous product is cleared
- ✅ New product displays correctly
- ✅ No UI glitches during transition

---

### Test 14: Edge Cases - Long Product Names

**Steps:**
1. Enter a very long product name:
   `Ultra Premium Wireless Noise Cancelling Over-Ear Bluetooth Headphones with Active Noise Reduction`
2. Select category
3. Generate

**Expected Results:**
- Form accepts long input
- AI generates appropriate title (may be shorter)
- Product card handles long text gracefully
- No layout breaks

**Success Criteria:**
- ✅ Long text wraps properly
- ✅ No text overflow
- ✅ Layout remains intact

---

### Test 15: API Response Validation

**Backend Test:**

Test that backend validates AI response properly.

**Steps:**
1. Check server console logs
2. Generate a product
3. Look for any parsing errors or validation issues

**Success Criteria:**
- ✅ Backend logs show successful AI response parsing
- ✅ No JSON parsing errors
- ✅ Response structure matches expected format

---

## Browser Compatibility Testing

Test in multiple browsers:

- [ ] **Chrome/Edge** (Chromium) - Latest version
- [ ] **Firefox** - Latest version
- [ ] **Safari** (Mac only) - Latest version
- [ ] **Mobile Safari** (iOS)
- [ ] **Chrome Mobile** (Android)

**All browsers should:**
- Display UI correctly
- Handle API requests properly
- Show animations smoothly
- Maintain responsive design

---

## Performance Testing

**Metrics to Check:**

1. **Initial Page Load:**
   - Target: < 2 seconds

2. **API Response Time:**
   - Target: 2-6 seconds (depends on Gemini API)

3. **UI Responsiveness:**
   - No lag when typing
   - Smooth animations
   - Instant button feedback

**Tools:**
- Chrome DevTools Lighthouse
- Network tab for API timing
- Performance tab for rendering metrics

---

## Security Testing

### Backend:
- [ ] API key is NOT exposed in frontend code
- [ ] API key is in .env file
- [ ] .env is in .gitignore
- [ ] No sensitive data in error messages
- [ ] Input validation on backend

### Frontend:
- [ ] No hardcoded secrets
- [ ] User input is properly handled
- [ ] Error messages don't expose system details

---

## Test Results Checklist

After completing all tests, verify:

- [ ] All 15 functional tests pass
- [ ] Responsive design works on all screen sizes
- [ ] No console errors in any test
- [ ] API calls succeed when backend is running
- [ ] Error handling works when backend is down
- [ ] Form validation prevents invalid submissions
- [ ] Loading states are clear and prevent duplicate requests
- [ ] Product cards display beautifully
- [ ] Tags are interactive with hover effects
- [ ] Accessibility features work (keyboard navigation)
- [ ] No security issues (API key hidden)
- [ ] Code is clean and well-organized
- [ ] README documentation is accurate

---

## Troubleshooting Common Issues

**Issue: API returns 500 error**
- Check Gemini API key is valid
- Verify API key has no extra spaces
- Check server console for specific error
- Ensure internet connection is active

**Issue: CORS error**
- Backend must be running on port 5000
- Frontend proxy is configured in vite.config.js
- Both servers must be running simultaneously

**Issue: Loading never completes**
- Check Network tab for failed requests
- Verify backend server is running
- Check Gemini API rate limits

**Issue: Layout breaks on mobile**
- Clear browser cache
- Check for CSS errors in console
- Verify viewport meta tag in index.html

---

## Success Metrics

The application is ready for submission when:

✅ All 15 test cases pass
✅ Works on desktop, tablet, and mobile
✅ No console errors or warnings
✅ Professional, polished UI
✅ Fast and responsive
✅ Accessible via keyboard
✅ Proper error handling
✅ Secure (no exposed secrets)
✅ Well-documented code
✅ README is complete and accurate

---

## Final Verification Command

Run these commands to verify everything:

```bash
# Check backend health
curl http://localhost:5000/health

# Expected: {"status":"ok","message":"Server is running"}

# Check frontend is accessible
# Open browser to http://localhost:5173
# Should see the application header and form
```

---

**Testing completed by:** _______________  
**Date:** _______________  
**All tests passed:** [ ] Yes [ ] No  
**Notes:** _______________
