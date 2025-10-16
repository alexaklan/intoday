'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { currentUser, getOrganisationById } from '@/lib/mock-data';
import { Settings, User, Mail, Lock, Shield } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const organisation = getOrganisationById(currentUser.organisationId);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  const handleSaveProfile = () => {
    // In a real app, this would make an API call
    console.log('Saving profile:', { name, email });
    alert('Profile updated successfully!');
  };
  
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    // In a real app, this would make an API call
    console.log('Changing password');
    alert('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Account Settings</h1>
              <p className="text-muted-foreground mt-1">
                Manage your profile and preferences
              </p>
            </div>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {getInitials(currentUser.name)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{currentUser.name}</h3>
                <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                <div className="flex gap-2 mt-3">
                  {currentUser.role === 'org_admin' ? (
                    <Badge variant="outline">
                      <Shield className="mr-1 h-3 w-3" />
                      Org Admin
                    </Badge>
                  ) : currentUser.role === 'app_admin' ? (
                    <Badge variant="outline">
                      <Shield className="mr-1 h-3 w-3" />
                      App Admin
                    </Badge>
                  ) : (
                    <Badge variant="outline">Staff</Badge>
                  )}
                </div>
              </div>
              
              <Separator className="mb-4" />
              
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground mb-2">ORGANISATION</div>
                <div className="p-2 bg-muted rounded-lg">
                  <p className="text-sm font-medium">{organisation?.name || 'N/A'}</p>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  <p className="text-sm text-muted-foreground">
                    Update your personal details
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium mb-2 block">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="text-sm font-medium mb-2 block">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="pt-2">
                  <Button onClick={handleSaveProfile}>
                    Save Profile Changes
                  </Button>
                </div>
              </div>
            </Card>
            
            {/* Password Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="h-5 w-5 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold">Change Password</h2>
                  <p className="text-sm text-muted-foreground">
                    Update your password to keep your account secure
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="current-password" className="text-sm font-medium mb-2 block">
                    Current Password
                  </label>
                  <input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter current password"
                  />
                </div>
                
                <div>
                  <label htmlFor="new-password" className="text-sm font-medium mb-2 block">
                    New Password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter new password (min. 8 characters)"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirm-password" className="text-sm font-medium mb-2 block">
                    Confirm New Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Confirm new password"
                  />
                </div>
                
                <div className="pt-2">
                  <Button 
                    onClick={handleChangePassword}
                    disabled={!currentPassword || !newPassword || !confirmPassword}
                  >
                    Change Password
                  </Button>
                </div>
              </div>
            </Card>
            
            {/* Notification Preferences */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold">Notification Preferences</h2>
                  <p className="text-sm text-muted-foreground">
                    Choose what updates you want to receive
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive email updates about schedule changes</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Weekly Summary</p>
                    <p className="text-xs text-muted-foreground">Get a weekly digest of team schedules</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Team Updates</p>
                    <p className="text-xs text-muted-foreground">Get notified when teammates change their status</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
              </div>
            </Card>
            
            {/* Danger Zone */}
            <Card className="p-6 border-destructive bg-destructive/5">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-destructive mb-1">Danger Zone</h2>
                <p className="text-sm text-muted-foreground">
                  Irreversible actions that affect your account
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-destructive rounded-lg bg-background">
                  <div>
                    <p className="font-medium text-sm">Delete Account</p>
                    <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

