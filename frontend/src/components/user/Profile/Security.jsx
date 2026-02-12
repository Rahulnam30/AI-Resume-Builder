import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import logo from "../../../assets/UptoSkills.webp";

export default function Security() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updatePassword = async () => {
    if (loading) return;

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (form.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 1200));
      toast.success("Password updated successfully");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f4f6f8] m-0 p-0">

      {/* LOGO BAR */}
      <div className="fixed md:static top-0 left-0 w-full z-50 h-[56px] sm:h-[64px] bg-white border-b border-gray-200 flex items-center justify-center sm:justify-start px-4 sm:px-8 m-0">
        <img
          src={logo}
          alt="UpToSkills Logo"
          className="h-7 sm:h-8 w-auto object-contain cursor-pointer"
          onClick={() => navigate("/user/dashboard")}
        />
      </div>

      {/* CENTERED CONTENT */}
      <div className="flex items-center justify-center min-h-screen md:min-h-[calc(100vh-64px)] px-4 pt-[56px] md:pt-0">

        <div className="w-full max-w-xl">

          {/* HEADER */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
              Change Password
            </h1>
          </div>

          {/* FORM */}
          <div className="space-y-6">
            <PasswordField
              label="Current Password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              show={show.current}
              toggle={() => setShow({ ...show, current: !show.current })}
              autoFocus
            />

            <PasswordField
              label="New Password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              show={show.new}
              toggle={() => setShow({ ...show, new: !show.new })}
              hint="Use at least 8 characters with numbers & symbols"
            />

            <PasswordField
              label="Confirm New Password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              show={show.confirm}
              toggle={() => setShow({ ...show, confirm: !show.confirm })}
            />
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="h-[48px] px-6 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 w-full sm:w-auto"
            >
              Cancel
            </button>

            <button
              onClick={updatePassword}
              className="h-[48px] px-6 rounded-xl flex items-center justify-center gap-2 bg-[#0f172a] text-white hover:bg-[#020617] w-full sm:w-auto"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              Update Password
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

/* PASSWORD FIELD COMPONENT */
const PasswordField = ({
  label,
  name,
  value,
  onChange,
  show,
  toggle,
  hint,
  autoFocus,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          className="
            w-full
            h-[48px]
            px-4
            pr-12
            border
            border-gray-300
            rounded-xl
            outline-none
            focus:border-slate-900
            focus:ring-2
            focus:ring-slate-900/20
          "
        />

        <button
          type="button"
          onClick={toggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {hint && <p className="text-sm text-gray-500 mt-1">{hint}</p>}
    </div>
  );
};