// import React, { useState, useEffect, useMemo } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import Navbar from '../components/Navbar';
// import './AddBlog.css';

// const EditBlog = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     author: '',
//     description: ''
//   });
//   const [image, setImage] = useState(null);
//   const [currentImage, setCurrentImage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const modules = useMemo(() => ({
//     toolbar: {
//       container: [
//         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//         [{ 'font': [] }],
//         [{ 'size': ['small', false, 'large', 'huge'] }],
//         ['bold', 'italic', 'underline', 'strike'],
//         [{ 'color': [] }, { 'background': [] }],
//         [{ 'script': 'sub'}, { 'script': 'super' }],
//         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//         [{ 'indent': '-1'}, { 'indent': '+1' }],
//         [{ 'align': [] }],
//         ['link', 'image', 'video'],
//         ['blockquote', 'code-block'],
//         ['clean']
//       ]
//     }
//   }), []);

//   const formats = [
//     'header', 'font', 'size',
//     'bold', 'italic', 'underline', 'strike',
//     'color', 'background',
//     'script',
//     'list', 'bullet', 'indent',
//     'align',
//     'link', 'image', 'video',
//     'blockquote', 'code-block'
//   ];

//   useEffect(() => {
//     fetchBlog();
//   }, [id]);

//   const fetchBlog = async () => {
//     try {
//       const response = await axios.get(`https://rakusharma.onrender.com/api/blogs/${id}`);
//       setFormData({
//         title: response.data.title,
//         author: response.data.author,
//         description: response.data.description
//       });
//       setCurrentImage(response.data.image_url);
//     } catch (error) {
//       console.error('Error fetching blog:', error);
//       alert('Failed to load blog');
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleDescriptionChange = (content) => {
//     setFormData({
//       ...formData,
//       description: content
//     });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = localStorage.getItem('token');
//       const formDataToSend = new FormData();
//       formDataToSend.append('title', formData.title);
//       formDataToSend.append('author', formData.author);
//       formDataToSend.append('description', formData.description);
//       if (image) {
//         formDataToSend.append('image', image);
//       }

//       await axios.put(`https://rakusharma.onrender.com/api/blogs/${id}`, formDataToSend, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       alert('Blog updated successfully!');
//       navigate('/admin');
//     } catch (error) {
//       console.error('Error updating blog:', error);
//       alert('Failed to update blog');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="add-blog-page">
//       <Navbar />
      
//       <div className="add-blog-container">
//         <h1>Edit Blog</h1>
        
//         <form onSubmit={handleSubmit} className="blog-form">
//           <div className="form-group">
//             <label htmlFor="title">Blog Title *</label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//               placeholder="Enter blog title"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="author">Author Name *</label>
//             <input
//               type="text"
//               id="author"
//               name="author"
//               value={formData.author}
//               onChange={handleChange}
//               required
//               placeholder="Enter author name"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="image">Featured Image</label>
//             {currentImage && !image && (
//               <div className="current-image">
//                 <p>Current Image:</p>
//                 <img src={`https://rakusharma.onrender.com${currentImage}`} alt="Current" />
//               </div>
//             )}
//             <input
//               type="file"
//               id="image"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="file-input"
//             />
//             {image && (
//               <div className="image-preview">
//                 <p>New Image Preview:</p>
//                 <img src={URL.createObjectURL(image)} alt="Preview" />
//               </div>
//             )}
//           </div>

//           <div className="form-group">
//             <label>Blog Content *</label>
//             <div className="editor-container">
//               <ReactQuill
//                 theme="snow"
//                 value={formData.description}
//                 onChange={handleDescriptionChange}
//                 modules={modules}
//                 formats={formats}
//                 placeholder="Write your blog content here..."
//               />
//             </div>
//           </div>

//           <div className="form-actions">
//             <button type="submit" className="btn-submit" disabled={loading}>
//               {loading ? 'Updating...' : 'Update Blog'}
//             </button>
//             <button
//               type="button"
//               className="btn-cancel"
//               onClick={() => navigate('/admin')}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditBlog;




import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './AddBlog.css';

const EditBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: ''
  });
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`https://rakusharma.onrender.com/api/blogs/${id}`);
      setFormData({
        title: response.data.title,
        author: response.data.author,
        description: response.data.description
      });
      setCurrentImage(response.data.image_url);
    } catch (error) {
      console.error('Error fetching blog:', error);
      alert('Failed to load blog');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const insertFormatting = (tag) => {
    const textarea = document.getElementById('description');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    
    let formattedText = '';
    
    switch(tag) {
      case 'bold':
        formattedText = `<strong>${selectedText}</strong>`;
        break;
      case 'italic':
        formattedText = `<em>${selectedText}</em>`;
        break;
      case 'h2':
        formattedText = `<h2>${selectedText}</h2>`;
        break;
      case 'h3':
        formattedText = `<h3>${selectedText}</h3>`;
        break;
      case 'p':
        formattedText = `<p>${selectedText}</p>`;
        break;
      case 'ul':
        formattedText = `<ul>\n  <li>${selectedText}</li>\n</ul>`;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newText = text.substring(0, start) + formattedText + text.substring(end);
    setFormData({
      ...formData,
      description: newText
    });
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('description', formData.description);
      if (image) {
        formDataToSend.append('image', image);
      }

      await axios.put(`https://rakusharma.onrender.com/api/blogs/${id}`, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Blog updated successfully!');
      navigate('/admin');
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Failed to update blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-blog-page">
      <Navbar />
      
      <div className="add-blog-container">
        <h1>Edit Blog</h1>
        
        <form onSubmit={handleSubmit} className="blog-form">
          <div className="form-group">
            <label htmlFor="title">Blog Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter blog title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author Name *</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              placeholder="Enter author name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Featured Image</label>
            {currentImage && !image && (
              <div className="current-image">
                <p>Current Image:</p>
                <img src={`https://rakusharma.onrender.com${currentImage}`} alt="Current" />
              </div>
            )}
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            {image && (
              <div className="image-preview">
                <p>New Image Preview:</p>
                <img src={URL.createObjectURL(image)} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Blog Content *</label>
            
            <div className="formatting-toolbar">
              <button type="button" onClick={() => insertFormatting('bold')} title="Bold" className="format-btn">
                <strong>B</strong>
              </button>
              <button type="button" onClick={() => insertFormatting('italic')} title="Italic" className="format-btn">
                <em>I</em>
              </button>
              <button type="button" onClick={() => insertFormatting('h2')} title="Heading 2" className="format-btn">
                H2
              </button>
              <button type="button" onClick={() => insertFormatting('h3')} title="Heading 3" className="format-btn">
                H3
              </button>
              <button type="button" onClick={() => insertFormatting('p')} title="Paragraph" className="format-btn">
                P
              </button>
              <button type="button" onClick={() => insertFormatting('ul')} title="List" className="format-btn">
                • List
              </button>
            </div>
            
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="15"
              placeholder="Write your blog content here..."
              className="blog-textarea"
            />
            
            <p className="editor-info">
              💡 Tip: Select text and click toolbar buttons to add formatting.
            </p>
            
            {formData.description && (
              <div className="content-preview">
                <h4>Preview:</h4>
                <div 
                  className="preview-content"
                  dangerouslySetInnerHTML={{ __html: formData.description }}
                />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Blog'}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/admin')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;