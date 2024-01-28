import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const AddForum = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAddPost = () => {
    // Check if required fields are not empty before submitting
    if (!title || !content) {
      alert('Please fill in the required fields (Title and Content).');
      return;
    }

    // Construct the new post object
    const newPost = {
      title,
      content,
      image: imageUrl ? { uri: imageUrl } : null,
      author: {
        userId: 'user1', // You might want to use the actual user ID from your authentication system
        username: 'Farmer123',
        avatar: require('../../assets/farmer/1.jpg'),
      },
      date: new Date().toISOString(),
      likes: 0,
      language: 'English',
      comments: [],
    };

    // Call the callback function to add the new post
    onAddPost(newPost);

    // Clear the form fields after submitting
    setTitle('');
    setContent('');
    setImageUrl('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        multiline
        numberOfLines={4}
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChangeText={(text) => setImageUrl(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddPost}>
        <Text style={styles.addButtonText}>Add Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  addButton: {
    backgroundColor: '#000000',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddForum;
