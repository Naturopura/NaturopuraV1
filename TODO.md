# TODO for Adding Pagination and Lazy Loading to MotionEvent Component

## Plan Breakdown
- [x] Step 1: Create the LazyImage component in `main_app/client/src/components/ui/LazyImage.tsx` using IntersectionObserver for lazy loading.
- [x] Step 2: Update `main_app/client/src/components/sensor/MotionEvent.tsx` to add pagination state (currentPage, pageSize), slice the filteredEvents for the current page, and implement pagination logic.
- [x] Step 3: In `MotionEvent.tsx`, replace the existing `<img>` tags with the new `<LazyImage>` component, passing the base64 src and alt.
- [x] Step 4: Add pagination UI controls (prev/next buttons, page info) to `MotionEvent.tsx` below the grid.
- [x] Step 5: Verify the implementation by testing pagination and lazy loading functionality.
