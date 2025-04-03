// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import userModel from "../models/userModel.js";
// import transporter from "../config/nodemailer.js";

// // In-memory store for pending registrations
// const pendingRegistrations = new Map();

// // Modified register endpoint – does NOT immediately create a user in the database.
// export const register = async (req, res) => {
//   const { name, email, password } = req.body;
  
//   if (!name || !email || !password) {
//     return res.json({ success: false, message: "Missing Details" });
//   }
  
//   try {
//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) {
//       return res.json({ success: false, message: "User already exists" });
//     }
    
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     // Generate a 6-digit OTP
//     const otp = String(Math.floor(100000 + Math.random() * 900000));
//     const expiry = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
    
//     // Store pending registration details in memory
//     pendingRegistrations.set(email, { name, email, password: hashedPassword, otp, expiry });
    
//     // Prepare the OTP email
//     const mailOptions = {
//       from: process.env.SENDER_EMAIL,
//       to: email,
//       subject: "⚠️ Account Verification for Ride Rental ⚠️",
//       text: `Dear ${name},

// Thank you for signing up! To complete your registration, please use the One-Time Password (OTP) below:

// Your OTP Code: ${otp}
// This code is valid for 15 minutes. Please do not share it with anyone.

// If you did not request this, please ignore this email or contact our support.`
//     };

//     // Log the mail options for debugging purposes
//     console.log("Sending OTP email with options:", mailOptions);
    
//     // Send the OTP via email
//     await transporter.sendMail(mailOptions);
//     return res.json({ success: true, message: "OTP sent successfully" });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };

// // For login
// export const login = async (req, res) => {
//   const { email, password } = req.body;
  
//   if (!email || !password) {
//     return res.json({ success: false, message: "Email and password are required" });
//   }
  
//   try {
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.json({ success: false, message: "Invalid email" });
//     }
    
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.json({ success: false, message: "Invalid password" });
//     }
    
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });
    
//     return res.json({ success: true, message: "Login successful" });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };

// // For logging out
// export const logout = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//     });
    
//     return res.json({ success: true, message: "Logout successful" });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };

// // Modified verifyEmail endpoint – accepts email and OTP, creates the user upon successful OTP match.
// export const verifyEmail = async (req, res) => {
//   const { email, otp } = req.body;
  
//   if (!email || !otp) {
//     return res.json({ success: false, message: "Missing Details" });
//   }
  
//   try {
//     const pendingUser = pendingRegistrations.get(email);
//     if (!pendingUser) {
//       return res.json({ success: false, message: "No pending registration found" });
//     }
    
//     if (pendingUser.otp !== otp) {
//       return res.json({ success: false, message: "Invalid OTP" });
//     }
    
//     if (pendingUser.expiry < Date.now()) {
//       pendingRegistrations.delete(email);
//       return res.json({ success: false, message: "OTP has expired" });
//     }
    
//     // Create the user in the database with account verified set to true
//     const newUser = new userModel({
//       name: pendingUser.name,
//       email: pendingUser.email,
//       password: pendingUser.password,
//       isAccountVerified: true,
//     });
//     await newUser.save();
    
//     // Remove pending registration data
//     pendingRegistrations.delete(email);
//     return res.json({ success: true, message: "Email verified successfully" });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };

// // Check if the user is authenticated
// export const isAuthenticated = async (req, res) => {
//   try {
//     return res.json({ success: true });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };

// // For re-sending the OTP for password reset
// export const sendResetotp = async (req, res) => {
//   const { email } = req.body;
  
//   if (!email) {
//     return res.json({ success: false, message: "Email is required" });
//   }
  
//   try {
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }
    
//     // Generate a new OTP for password reset
//     const otp = String(Math.floor(100000 + Math.random() * 900000));
//     user.resetotp = otp;
//     user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
    
//     await user.save();
    
//     const mailOptions = {
//       from: process.env.SENDER_EMAIL,
//       to: user.email,
//       subject: "New OTP code for Ride Rentals",
//       text: `You requested a new One-Time Password (OTP) to verify your account on Ride Rental. Please use the code below:

// Your OTP Code: ${otp}
// This code is valid for 15 minutes. If you didn't request this, please ignore this email.

// For security reasons, do not share this code with anyone.`,
//     };
    
//     await transporter.sendMail(mailOptions);
//     return res.json({ success: true, message: "OTP resent to your registered email" });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };

// // For resetting the password
// export const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;
  
//   if (!email || !otp || !newPassword) {
//     return res.json({ success: false, message: "Insufficient information provided" });
//   }
  
//   try {
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }
    
//     if (user.resetotp === "" || user.resetotp !== otp) {
//       return res.json({ success: false, message: "Invalid OTP" });
//     }
    
//     if (user.resetOtpExpireAt < Date.now()) {
//       return res.json({ success: false, message: "OTP Expired" });
//     }
    
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
    
//     user.resetotp = "";
//     user.resetOtpExpireAt = 0;
    
//     await user.save();
//     return res.json({ success: true, message: "Password has been reset successfully" });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };




import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
// for registering the new usee
export const register = async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name ||!email ||!password) {
      return res.json({ success: false, message: 'Missing Details' });
    }

    try {

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
          }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        // The below block of code is for sending the mail to the registered user (SEND MAIL)
        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: email,
          subject: 'Security Notice: Registration attempt to Your Account',
          text: `Dear ${name},
          We detected a registration attempt to your Ride Rental account. For your security, we want to ensure that this was you.
          `
        };
        
        await transporter.sendMail(mailOptions);


        return res.json({ success: true, message: 'Registration successful' });


      } catch (error) {
        res.json({ success: false, message: error.message });
      }
  };


// for login 
export const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email ||!password) {
      return res.json({ success: false, message: 'Email and password are required' });
    }
  
    try {
      
        const user = await userModel.findOne({ email });

        if (!user) {
        return res.json({ success: false, message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.json({ success: true, message: 'Login successful' });

    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
};


// For logging out 
export const logout = async (req, res) => {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production'? 'none': 'strict',
      });

      return res.json({ success: true, message: 'Logout successful' });


    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
};
  

// The code below is written for opt verification

// export const sendVerifyotp = async (req, res) => {
//     try {
//       const { userId } = req.body; 

//       const user = await userModel.findById(userId);

//       if (user.isAccountVerified) {
//         return res.json({ success: false, message: "Account Already verified" });
//       }
//       const otp = String(Math.floor(100000 + Math.random() * 900000));

//       user.verifyotp = otp;
//       user.verifyOtpExpireAt = Date.now() + 15 * 60 * 1000;

//       await user.save();

//       // below code is for sending opt 

//       const mailOption = {
//         from: process.env.SENDER_EMAIL,
//         to: user.email,
//         subject: '⚠️⚠️⚠️ Account Verification for Ride Rental ⚠️⚠️⚠️',
//         text: `Thank you for signing up! To complete your account verification, please use the One-Time Password (OTP) below:

//                 Your OTP Code: ${otp}
//                 This code is valid for 15 minutes. Please do not share it with anyone for security reasons.

//                 If you didn't request this verification, please ignore this email or contact our support team immediately.

//                 Need help? Help yourself  `
//       };

//       await transporter.sendMail(mailOption);


//     } catch (error) {
//       res.json({ success: false, message: error.message });
//     }
// };




// the above one was having issue sending otp so the below is done by chatgpt 




export const sendVerifyotp = async (req, res) => {
  try {
    // Expecting userId in the request body
    const { userId } = req.body; 

    // Find the user by their ID
    const user = await userModel.findById(userId);

    // Check if the user's account is already verified
    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    // Generate a 6-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // Save the OTP and its expiration time to the user model
    user.verifyotp = otp;
    user.verifyOtpExpireAt = Date.now() + 15 * 60 * 1000; // Valid for 15 minutes
    await user.save();

    // Define mail options
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: '⚠️⚠️⚠️ Account Verification for Ride Rental ⚠️⚠️⚠️',
      text: `Thank you for signing up! To complete your account verification, please use the One-Time Password (OTP) below:

Your OTP Code: ${otp}
This code is valid for 15 minutes. Please do not share it with anyone for security reasons.

If you didn't request this verification, please ignore this email or contact our support team immediately.`
    };

    // Send the email
    await transporter.sendMail(mailOption);

    // **Return a response on success**
    return res.json({ success: true, message: "OTP sent successfully" });
    
  } catch (error) {
    // Return an error response if something goes wrong
    return res.json({ success: false, message: error.message });
  }
};


// For verifying the otp 
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.json({ success: false, message: 'Missing Details' });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    
    if (user.verifyotp === "" || user.verifyotp !== otp) {
      return res.json({ success: false, message: 'Invalid OTP' });
    }

    // checkign the expiring of OTP
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: 'OTP has expired' });
    }

    user.isAccountVerified = true;
    user.verifyotp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();
    return res.json({ success: true, message: 'Email verified successfully' });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


// To see if the user is authenticated
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// For re sending the opt
export const sendResetotp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: 'Email is required' });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
      
    // For resending the otp
            const otp = String(Math.floor(100000 + Math.random() * 900000));

              user.resetotp = otp;
              user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

              await user.save();

              const mailOption = {
                from: process.env.SENDER_EMAIL,
                to: user.email,
                subject: 'New OTP code for Ride Rentals',
                text: `You requested a new One-Time Password (OTP) to verify your account on Ride Rental. Please use the code below:

                        Your OTP Code: ${otp}
                        This code is valid for 15 minutes. If you didn't request this, please ignore this email.

                        For security reasons, do not share this code with anyone.  `
              };

              transporter.sendMail(mailOption);

              return res.json({ success: true, message: 'OTP resent to your registered email' });
    
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Below code is for reseting the password

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({ success: false, message: 'Too many insufficient info, better be good at remembering your credentials' });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (user.resetotp === "" || user.resetotp !== otp) {
      return res.json({ success: false, message: 'Invalid OTP' });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: 'OTP Expired' });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    
    user.resetotp = '';
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({ success: true, message: 'Password has been reset successfully' });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};