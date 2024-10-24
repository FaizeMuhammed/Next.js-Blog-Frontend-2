'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CloudUpload } from "lucide-react";
import axios from 'axios';
import useAuthStore from '@/stores/authStore';

export default function CreateBlog() {
  const initialFormState = {
    title: '',
    category: '',
    publishingDate: '',
    authorName: '',
    paragraphs: [{ title: '', content: '' }]
  };

  const [formData, setFormData] = useState(initialFormState);
  const { token } = useAuthStore();

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'paragraphTitle' || name === 'paragraphContent') {
      const newParagraphs = [...formData.paragraphs];
      newParagraphs[index] = {
        ...newParagraphs[index],
        [name === 'paragraphTitle' ? 'title' : 'content']: value
      };
      setFormData({ ...formData, paragraphs: newParagraphs });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  const addParagraph = () => {
    setFormData({
      ...formData,
      paragraphs: [...formData.paragraphs, { title: '', content: '' }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/posts', formData, {
        withCredentials: true // This ensures cookies are sent with the request
      });
      console.log('Blog post created:', response.data);
      
      setFormData(initialFormState);
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };

  return (
    <Card className="w-full mt-10 max-w-6xl mx-auto bg-[#1E1E1E] text-white rounded-lg shadow-lg border border-gray-700">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="blog-image">Blog Image</Label>
            <Card className="border-2 border-dashed border-yellow-500 bg-[#121212] p-6 text-center cursor-pointer">
              <CloudUpload className="mx-auto h-12 w-12 text-yellow-500" />
              <p className="mt-2 text-sm text-gray-400">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              <input id="blog-image" type="file" className="hidden" />
            </Card>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Blog Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="The Best Kept Secrets"
              className="bg-[#121212] w-[45%]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={handleSelectChange} value={formData.category}>
                <SelectTrigger className="bg-[#121212]">
                  <SelectValue placeholder="Choose Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="publishingDate">Publishing Date</Label>
              <Input
                id="publishingDate"
                name="publishingDate"
                type="date"
                value={formData.publishingDate}
                onChange={handleInputChange}
                className="bg-[#121212]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="authorName">Author Name</Label>
            <Input
              id="authorName"
              name="authorName"
              value={formData.authorName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="bg-[#121212]"
            />
          </div>

          {formData.paragraphs.map((paragraph, index) => (
            <div key={index} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`paragraphTitle-${index}`}>Paragraph Title</Label>
                <Input
                  id={`paragraphTitle-${index}`}
                  name="paragraphTitle"
                  value={paragraph.title}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Introduction"
                  className="bg-[#121212]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`paragraphContent-${index}`}>Description</Label>
                <Textarea
                  id={`paragraphContent-${index}`}
                  name="paragraphContent"
                  value={paragraph.content}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Write your blog content here..."
                  className="bg-[#121212] h-32"
                />
              </div>
            </div>
          ))}

          <Button type="button" onClick={addParagraph} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
            ADD NEW PARAGRAPH AND DESCRIPTION
          </Button>

          <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
            Create Blog
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}