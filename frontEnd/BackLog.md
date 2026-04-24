## Role Based DashBoard

### **[Customer]**

    - Active parcel section [responsive polish , react query finilize, (console.log font size issue)].
    - key Metrics [ UI/UX polish & responsiveness ]
    - timeline section and history section [not started ]
    - Attach background pattern on each section of main content in CustomerDashboard
    - Implement React Query and update codebase [server fetch and ui level data test ]
    - Implement all the pages  related to navbar [except live location {will be integrated on phase 2 }]
    - full manual test of the  dashboard.

### **[Admin]**

    - No Frontend work has been started yet

### **[Agent]**

    -No Frontend work has been started yet

## Remodeling schema for payment and fees calculation

    - Total Fee = Base Zone rate + (Weight X Per Kg Charge ) + Type Surcharge (eg. Fragile )
    - also extra charge if you want that amount to taken when delivered

| Category         | Task                                                                                      | Priority | Status   |
| ---------------- | ----------------------------------------------------------------------------------------- | -------- | -------- |
| Database         | "Create GlobalSetting schema for dynamic pricing (fees, weights)."                        | High     | 🟦 To Do |
| Transaction      | utility functions to calculate fees && update createParcel functiuon in parcel controller | High     | 🟦 To Do |
| Database         | Wallet Integration Add walletBalance to the User model, add deliveryFee to parcel model   | High     | ☑️ Done  |
| Validation       | Define a parcelSchema using Zod (to be shared/mirrored).                                  | High     | 🟦 To Do |
| TypeScript       | Define interface Parcel and interface User for type safety                                | High     | 🟦 To Do |
| Frontend         | Integrate react-hook-form + @hookform/resolvers/zod in Modal.                             | Medium   | 🟦 To Do |
| Logic            | Add calculateFee utility on backend fetching from GlobalSetting                           | Medium   | 🟦 To Do |
| UI/UX            | Build Admin Settings dashboard to update fee values dynamically.                          | Low      | 🟦 To Do |
| Refactor         | Convert CreateParcelModal from .jsx to .tsx                                               | Low      | 🟦 To Do |
| Upsert Logic     | Implement findOneAndUpdate with upsert: true for settings.                                | Low      | 🟦 To Do |
| Admin Middleware | Ensure these routes are protected by an isAdmin middleware..                              | Low      | 🟦 To Do |
| Audit Collection | (Optional) Create a BusinessSettingsHistory model to track old prices.                    | Low      | 🟦 To Do |

### Frontend (React / Modal)

    Update Form Inputs to Selects: Convert parcelType and paymentType inputs into <select> dropdown elements containing <option> tags that match your backend Enums exactly.

    Implement Conditional Form Logic: \* Add const [paymentType, setPaymentType] = useState("COD");.

    Bind the paymentType select to this state.

    Conditionally render the <input name="codAmount" type="number" /> only when paymentType === "COD".

    Format Data on Submit: Inside handleSubmit, parse codAmount into an actual number before passing it to mutation.mutate().

### Backend (Node / Mongoose)

    Implement Delivery Fee Calculation: Create a utility function to determine the delivery cost based on parcelType and distance/location.

    Wallet Integration (If chosen): Add walletBalance to the User model and handle the deduction inside the createParcel transaction block.

    Input Validation: Add a validation layer (like Zod or Joi) in your route before it hits the controller to ensure required fields (deliveryContactName, etc.) aren't empty strings.
