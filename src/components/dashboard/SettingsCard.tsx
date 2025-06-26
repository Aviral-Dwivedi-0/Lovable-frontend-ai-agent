import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Settings,
  Mail,
  Users,
  Bell,
  Globe,
  MapPin,
  Phone as PhoneIcon,
  Info,
  Edit,
  Lock,
} from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash } from "lucide-react";

interface SettingsCardProps {
  profileData?: {
    name?: string;
    email?: string;
    company?: string;
    website?: string;
    location?: string;
    bio?: string;
    phone?: string;
  };
  onSave?: (data: {
    name: string;
    email: string;
    company?: string;
    website?: string;
    location?: string;
    bio?: string;
    phone?: string;
    notifications: boolean;
    password?: string;
    twoFA: boolean;
  }) => void;
}

export default function SettingsCard({
  profileData = {},
  onSave = () => {},
}: SettingsCardProps) {
  const { theme } = useTheme();

  // DUMMY DATA updated as per attached image
  const dummy = {
    name: "Rachel Patel",
    email: "rachel.patel@email.com",
    company: "SniperThink Technologies",
    website: "https://sniperthink.com",
    location: "Hyderabad, India",
    bio: "AI Research Lead, operationalizing AI agents across enterprise workflows.",
    phone: "+91 99200 29528",
  };

  // State for editable fields, prefilled with dummy data or provided data
  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState(profileData.name || dummy.name);
  const [email, setEmail] = useState(profileData.email || dummy.email);
  const [company, setCompany] = useState(profileData.company || dummy.company);
  const [website, setWebsite] = useState(profileData.website || dummy.website);
  const [location, setLocation] = useState(
    profileData.location || dummy.location
  );
  const [bio, setBio] = useState(profileData.bio || dummy.bio);
  const [phone, setPhone] = useState(profileData.phone || dummy.phone);
  const [notifications, setNotifications] = useState(true);

  // Password update fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isPasswordConfirmOpen, setIsPasswordConfirmOpen] = useState(false);

  const [twoFA, setTwoFA] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Editable team members state (all changes pending until Save)
  type Member = { name: string; role: "Owner" | "can edit" | "can view" };
  const initialMembers: Member[] = [
    { name: "Pravalika", role: "Owner" },
    { name: "Nitya Jain", role: "can view" },
    { name: "Siddhant Jaiswal", role: "can view" },
    { name: "sniperthink (you)", role: "Owner" }, // Another owner for sample; only one should be "Owner"
  ];
  const [members, setMembers] = useState<Member[]>(initialMembers);

  // Track pending team member state to persist on Save
  const [pendingMembers, setPendingMembers] =
    useState<Member[]>(initialMembers);

  function handleMemberRoleChange(idx: number, role: "can edit" | "can view") {
    setPendingMembers((members) =>
      members.map((m, i) => (i === idx ? { ...m, role } : m))
    );
  }

  function handleDeleteMember(idx: number) {
    setPendingMembers((members) => members.filter((_, i) => i !== idx));
  }

  // When toggling edit mode ON: copy members to pendingMembers
  // When toggling edit mode OFF: reset pendingMembers to main members
  function handleEditToggle() {
    setEditMode((em) => {
      if (!em) {
        setPendingMembers(members);
      } else {
        setPendingMembers(members); // Canceling edit just reverts
      }
      return !em;
    });
    setPasswordError("");
  }

  // Save handler -- disables edit mode on submit
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editMode) return;

    if (
      (newPassword || confPassword || oldPassword) &&
      (!oldPassword || !newPassword || !confPassword)
    ) {
      setPasswordError("Please complete all password fields.");
      return;
    }
    if (newPassword && newPassword !== confPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    setPasswordError("");
    if (oldPassword && newPassword && confPassword) {
      setIsPasswordConfirmOpen(true);
    } else {
      onSave({
        name,
        email,
        company,
        website,
        location,
        bio,
        phone,
        notifications,
        twoFA,
      });
      setMembers(pendingMembers);
      setEditMode(false);
    }
  };

  const handleConfirmPasswordSave = () => {
    setIsPasswordConfirmOpen(false);
    onSave({
      name,
      email,
      company,
      website,
      location,
      bio,
      phone,
      notifications,
      password: newPassword,
      twoFA,
    });
    setMembers(pendingMembers);
    setOldPassword("");
    setNewPassword("");
    setConfPassword("");
    setEditMode(false);
  };

  // All fields are prefilled and editable only when in editMode
  return (
    <Card
      className={`shadow-2xl border-0 transition-colors max-w-2xl mx-auto w-full animate-fade-in 
      ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-slate-950 to-black"
          : "bg-gradient-to-br from-white via-slate-50 to-gray-100"
      }`}
    >
      <CardHeader className="pb-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2 justify-between relative">
        {/* Settings icon LEFT side */}
        <div className="flex items-center gap-2">
          <Settings className="w-8 h-8 text-teal-600 dark:text-teal-400" />
          <div>
            <CardTitle
              className={`text-2xl tracking-tight ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Settings
            </CardTitle>
            <CardDescription className="text-base text-gray-600 dark:text-slate-400 font-medium">
              Edit your personal info, security, and notifications.
            </CardDescription>
          </div>
        </div>
        {/* Edit Profile button at the absolute right */}
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-2 absolute top-5 right-6"
          onClick={handleEditToggle}
          type="button"
        >
          <Edit className="w-4 h-4" />
          {editMode ? "Cancel" : "Edit Profile"}
        </Button>
      </CardHeader>

      <form onSubmit={handleSave}>
        <CardContent className="py-7 space-y-7">
          {/* Personal Info */}
          <section>
            <h3
              className={`font-semibold text-lg mb-3 flex items-center gap-2 ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              <Mail className="w-5 h-5 text-blue-400" />
              Edit Personal Info
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="mb-1 block">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                  required
                  readOnly={!editMode}
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                />
              </div>
              <div>
                <Label htmlFor="email" className="mb-1 block">
                  Email
                </Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  required
                  type="email"
                  readOnly={!editMode}
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                />
              </div>
              <div>
                <Label
                  htmlFor="company"
                  className="mb-1 block flex items-center gap-1"
                >
                  <Users className="w-4 h-4 inline" />
                  Organization
                </Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  autoComplete="off"
                  readOnly={!editMode}
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                />
              </div>
              <div>
                <Label
                  htmlFor="website"
                  className="mb-1 block flex items-center gap-1"
                >
                  <Globe className="w-4 h-4 inline" />
                  Website
                </Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  readOnly={!editMode}
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                />
              </div>
              <div>
                <Label
                  htmlFor="phone"
                  className="mb-1 block flex items-center gap-1"
                >
                  <PhoneIcon className="w-4 h-4 inline" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  readOnly={!editMode}
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                />
              </div>
              <div>
                <Label
                  htmlFor="location"
                  className="mb-1 block flex items-center gap-1"
                >
                  <MapPin className="w-4 h-4 inline" />
                  Location
                </Label>
                <Input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  readOnly={!editMode}
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                />
              </div>
              <div className="sm:col-span-2">
                <Label
                  htmlFor="bio"
                  className="mb-1 block flex items-center gap-1"
                >
                  <Info className="w-4 h-4 inline" />
                  Bio
                </Label>
                <Input
                  id="bio"
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Short description about you"
                  readOnly={!editMode}
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                />
              </div>
            </div>
          </section>
          <Separator />

          {/* Notifications */}
          <section>
            <div className="flex items-center gap-3 mb-2">
              <Bell className="w-5 h-5 text-yellow-400" />
              <h3
                className={`font-semibold text-lg ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                Notifications
              </h3>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span
                className={`${
                  theme === "dark" ? "text-slate-200" : "text-gray-900"
                } font-medium`}
              >
                Enable Notifications
              </span>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
                disabled={!editMode}
              />
            </div>
          </section>
          <Separator />

          <section>
            <div className="flex items-center gap-3 mb-2">
              <Lock className="w-5 h-5 text-rose-400" />
              <h3
                className={`font-semibold text-lg ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                Update Password
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="old-password">Current Password</Label>
                <Input
                  id="old-password"
                  type="password"
                  autoComplete="current-password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  readOnly={!editMode}
                />
              </div>
              <div>
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  readOnly={!editMode}
                />
              </div>
              <div>
                <Label htmlFor="conf-password">Confirm New Password</Label>
                <Input
                  id="conf-password"
                  type="password"
                  autoComplete="new-password"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  readOnly={!editMode}
                />
              </div>
            </div>
            {passwordError && (
              <div className="text-sm text-red-600 mt-2">{passwordError}</div>
            )}
          </section>
          <Separator />

          <section>
            <div className="flex items-center gap-3 mb-2">
              <Lock className="w-5 h-5 text-purple-400" />
              <h3
                className={`font-semibold text-lg ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                Setup Two Factor Auth (2FA)
              </h3>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span
                className={
                  theme === "dark" ? "text-slate-200" : "text-gray-900"
                }
              >
                Enable 2FA
              </span>
              <Switch
                checked={twoFA}
                onCheckedChange={setTwoFA}
                disabled={!editMode}
              />
            </div>
          </section>
        </CardContent>
        <CardFooter className="justify-end gap-3 pt-2">
          {/* Only show Save Changes button when in edit mode */}
          {editMode && (
            <Button
              type="submit"
              className="px-7 bg-teal-700 hover:bg-teal-800"
            >
              Save Changes
            </Button>
          )}
        </CardFooter>
      </form>
      {/* Team Members Table (edit roles, delete, Owner edit-blocked) */}
      <div className="px-6 pb-8">
        <h3
          className={`font-semibold text-lg mt-6 mb-2 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Team Members
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(editMode ? pendingMembers : members).map((member, idx) => {
              const isOwner = member.role === "Owner";
              return (
                <TableRow key={member.name + idx}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell className="capitalize">
                    {isOwner ? (
                      <span>Owner</span>
                    ) : editMode ? (
                      <Select
                        value={member.role}
                        onValueChange={(value) =>
                          handleMemberRoleChange(
                            idx,
                            value as "can edit" | "can view"
                          )
                        }
                        disabled={isOwner || !editMode}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="can edit">can edit</SelectItem>
                          <SelectItem value="can view">can view</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <span>{member.role}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {!isOwner && editMode && (
                      <button
                        aria-label="Delete Member"
                        type="button"
                        className="text-red-600 hover:bg-red-50 rounded-full p-1 transition"
                        onClick={() => handleDeleteMember(idx)}
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {/* Removed InviteTeamModal */}
      <Dialog
        open={isPasswordConfirmOpen}
        onOpenChange={setIsPasswordConfirmOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Password Change</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            Are you sure you want to update your password?
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPasswordConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmPasswordSave}
              className="bg-teal-700 text-white hover:bg-teal-800"
            >
              Yes, Update Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
