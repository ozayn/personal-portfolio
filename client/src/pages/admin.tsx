import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, Plus } from "lucide-react";
import { photographyCategories, photographyImages } from "@/data/portfolio-data";

export default function AdminPage() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    event: "",
    description: "",
    tags: "",
  });
  const [customEvent, setCustomEvent] = useState("");
  const [showCustomEvent, setShowCustomEvent] = useState(false);

  // Get existing events from both static and database photos
  const { data: dbPhotos = [] } = useQuery({
    queryKey: ["/api/photos"],
    enabled: isAuthenticated,
  });

  const dbPhotoArray = Array.isArray(dbPhotos) ? dbPhotos : [];
  const allPhotos = [...photographyImages, ...dbPhotoArray];
  const existingEvents = Array.from(new Set(
    allPhotos
      .filter(photo => photo.event)
      .map(photo => photo.event)
      .filter(Boolean)
  )).sort();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Access Required",
        description: "Please log in to access the admin panel",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/photo-studio";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  // Refetch function for photos
  const { refetch } = useQuery({
    queryKey: ["/api/photos"],
    enabled: isAuthenticated,
  });

  const uploadMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch("/api/photos", {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Photo uploaded successfully!",
      });
      setFile(null);
      setFormData({ title: "", category: "", event: "", description: "", tags: "" });
      setCustomEvent("");
      setShowCustomEvent(false);
      refetch();
      
      // Invalidate the photos cache globally so photography section updates
      queryClient.invalidateQueries({ queryKey: ["/api/photos"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "Please log in again to continue",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/photo-studio";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to upload photo. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      console.log("Deleting photo with ID:", id);
      const response = await fetch(`/api/photos/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Photo deleted successfully!",
      });
      refetch();
      
      // Invalidate the photos cache globally so photography section updates
      queryClient.invalidateQueries({ queryKey: ["/api/photos"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "Please log in again to continue",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/photo-studio";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete photo. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a photo to upload",
        variant: "destructive",
      });
      return;
    }

    const data = new FormData();
    data.append("photo", file);
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("event", showCustomEvent ? customEvent : formData.event);
    data.append("description", formData.description);
    data.append("tags", formData.tags);

    uploadMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Admin Panel
          </h1>
          <Button
            variant="outline"
            onClick={() => window.location.href = "/api/logout"}
          >
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <Card>
            <CardHeader>
              <CardTitle>Upload New Photo</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="photo">Photo</Label>
                  <div className="mt-2">
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                    {file && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Selected: {file.name}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter photo title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {photographyCategories.filter(cat => cat !== "all").map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.category === "events" && (
                  <div>
                    <Label htmlFor="event">Event</Label>
                    <div className="space-y-2">
                      <Select
                        value={showCustomEvent ? "custom" : formData.event}
                        onValueChange={(value) => {
                          if (value === "custom") {
                            setShowCustomEvent(true);
                            setFormData(prev => ({ ...prev, event: "" }));
                          } else {
                            setShowCustomEvent(false);
                            setFormData(prev => ({ ...prev, event: value }));
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select existing event or create new" />
                        </SelectTrigger>
                        <SelectContent>
                          {existingEvents.map((event) => (
                            <SelectItem key={event} value={event}>
                              {event}
                            </SelectItem>
                          ))}
                          <SelectItem value="custom">
                            <Plus className="h-4 w-4 mr-2" />
                            Create New Event
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {showCustomEvent && (
                        <Input
                          value={customEvent}
                          onChange={(e) => setCustomEvent(e.target.value)}
                          placeholder="Enter new event name"
                        />
                      )}
                    </div>
                  </div>
                )}
                
                {formData.category !== "events" && (
                  <div>
                    <Label htmlFor="event">Event (Optional)</Label>
                    <Input
                      id="event"
                      value={formData.event}
                      onChange={(e) => setFormData(prev => ({ ...prev, event: e.target.value }))}
                      placeholder="Enter event name"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter photo description"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="tag1, tag2, tag3"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={uploadMutation.isPending}
                >
                  {uploadMutation.isPending ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Photos List */}
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Photos ({dbPhotoArray.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {dbPhotoArray.map((photo: any) => (
                  <div key={photo.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{photo.title}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {photo.category} {photo.event && `• ${photo.event}`}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMutation.mutate(photo.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {dbPhotoArray.length === 0 && (
                  <p className="text-center text-slate-500 dark:text-slate-400 py-8">
                    No photos uploaded yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}