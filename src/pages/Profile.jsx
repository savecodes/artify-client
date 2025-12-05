import { useContext, useState, useEffect } from "react";
import { User, Mail, Lock, Image, Edit2, Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const ProfileSettings = () => {
  const {
    user,
    setUser,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
    reauthenticateUser,
  } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    imageURL: "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || "",
        email: user.email || "",
        imageURL: user.photoURL || "",
        currentPassword: "",
        newPassword: "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    setLoading(true);

    try {
      if (formData.name !== user.displayName || formData.imageURL !== user.photoURL) {
        await updateUserProfile({
          displayName: formData.name,
          photoURL: formData.imageURL,
        });
      }

      if (formData.email !== user.email) {
        if (!formData.currentPassword) {
          Swal.fire({
            icon: "error",
            title: "Password Required",
            text: "Enter current password to update email",
          });
          setLoading(false);
          return;
        }

        const auth = await reauthenticateUser(formData.currentPassword);
        if (!auth) {
          setLoading(false);
          return;
        }

        await updateUserEmail(formData.email);
      }

      if (formData.newPassword) {
        if (!formData.currentPassword) {
          Swal.fire({
            icon: "error",
            title: "Password Required",
            text: "Enter current password to set new password",
          });
          setLoading(false);
          return;
        }

        const auth = await reauthenticateUser(formData.currentPassword);
        if (!auth) {
          setLoading(false);
          return;
        }

        await updateUserPassword(formData.newPassword);
      }

      // Update user context
      setUser({
        ...user,
        displayName: formData.name,
        photoURL: formData.imageURL,
        email: formData.email,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Profile updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      // Clear passwords
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
      }));
      setIsEditing(false);
    } catch (err) {
      Swal.fire({ icon: "error", title: "Update Failed", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (!user)
    return (
      <p className="text-center py-20 text-gray-600">
        Please log in to view your profile
      </p>
    );

  return (
    <div className="w-full min-h-screen py-12">
      <div className="w-10/12 mx-auto max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-linear-to-r from-pink-500 to-purple-600 h-32"></div>
          <div className="px-8 pb-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 mb-8">
              <div className="relative">
                <img
                  src={formData.imageURL || user.photoURL}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-xl"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                />
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {user.displayName}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Member</p>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Edit2 size={18} /> <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
              </button>
            </div>

            {/* Form Section */}
            <div className="space-y-6">
              {/* Name Field */}
              <div className="grid md:grid-cols-3 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <div className="md:col-span-2">
                  {isEditing ? (
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3">
                      <User size={18} className="text-gray-400 mr-3" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-transparent outline-none w-full"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-900 dark:text-gray-200 py-3">
                      {user.displayName || "Not set"}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="grid md:grid-cols-3 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <div className="md:col-span-2">
                  {isEditing ? (
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3">
                      <Mail size={18} className="text-gray-400 mr-3" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-transparent outline-none w-full"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-900 dark:text-gray-200 py-3">{user.email || "Not set"}</p>
                  )}
                </div>
              </div>

              {/* Image URL Field */}
              <div className="grid md:grid-cols-3 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Image URL</label>
                <div className="md:col-span-2">
                  {isEditing ? (
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3">
                      <Image size={18} className="text-gray-400 mr-3" />
                      <input
                        type="text"
                        name="imageURL"
                        value={formData.imageURL}
                        onChange={handleInputChange}
                        className="bg-transparent outline-none w-full"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-900 dark:text-gray-200 py-3 truncate">{user.photoURL || "Not set"}</p>
                  )}
                </div>
              </div>

              {/* Password Section */}
              {isEditing && (
                <>
                  <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Change Password</span>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                  </div>

                  {/* Current Password */}
                  <div className="grid md:grid-cols-3 gap-4 items-center">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                    <div className="md:col-span-2">
                      <div className="flex items-center bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 relative">
                        <Lock size={18} className="text-gray-400 mr-3" />
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          className="bg-transparent outline-none w-full pr-10"
                          placeholder="Current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-4 text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="grid md:grid-cols-3 gap-4 items-center">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                    <div className="md:col-span-2">
                      <div className="flex items-center bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 relative">
                        <Lock size={18} className="text-gray-400 mr-3" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="bg-transparent outline-none w-full pr-10"
                          placeholder="New password (optional)"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Leave blank to keep current password
                      </p>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleUpdateProfile}
                      disabled={loading}
                      className="px-8 py-3 bg-linear-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;