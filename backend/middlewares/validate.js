
function validateFields(allowedFields = []) {
    return (req, res, next) => {
        const keys = Object.keys(req.body);// Extract keys from request body
  // ---------- POST Request: Check for all required fields ----------
        if (req.method === "POST") {
              // Find missing required fields
            const missingFields = allowedFields.filter(field => !keys.includes(field));
             if (missingFields.length > 0) {
                return res.status(400).json({
                    error: `Missing required fields: ${missingFields.join(", ")}`
                });
            }
            // const hasAllRequired = allowedFields.every(field => keys.includes(field));
            // if (!hasAllRequired) {
            //     return res.status(400).json({
            //         error: `Missing required fields: ${allowedFields.join(", ")}`
            //     });
            // }
        }

        // ---------- PUT Request: Require at least one field ----------
        if (req.method === "PUT" && keys.length === 0) {
            return res.status(400).json({
                error: "At least one field must be provided to update"
            });
        }
  // ---------- Check for unexpected fields ----------
        const invalidFields = keys.filter(key => !allowedFields.includes(key));
        if (invalidFields.length > 0) {
            return res.status(400).json({
                error: `Invalid fields in request body: ${invalidFields.join(", ")}. Allowed fields: ${allowedFields.join(", ")}`
            });
        }
 // ---------- Check for empty or invalid values ---------
    
     const emptyFields = keys.filter(key => {
            const val = req.body[key];
            return val === null || val === undefined || (typeof val === 'string' && val.trim() === "");
        });

        if (emptyFields.length > 0) {
            return res.status(400).json({
                error: `Fields must not be empty: ${emptyFields.join(", ")}`
            });
        }
  // ---------- If all checks pass, move to next middleware/controller ----------
        next();
    };
}

export default validateFields;
