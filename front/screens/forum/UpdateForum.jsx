import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import forumData from '../../data/ForumData';

const UpdateForum = ({ route }) => {
  const { _id } = route.params;

  // Find the post with the matching _id
  const selectedPost = forumData.find((post) => post.id === _id);

  console.log(selectedPost.image)
  // State to track the updated post data
  const [updatedPost, setUpdatedPost] = useState({
    title: selectedPost ? selectedPost.title : '',
    content: selectedPost ? selectedPost.content : '',
    image: selectedPost ? selectedPost.image : '',
  });

  const handleUpdatePost = () => {
    // Implement logic to update the post with updatedPost data
    console.log('Updating post:', updatedPost);
    // You can use this data to update the post in your data source
  };

  return (
    <View style={styles.container}>
      {selectedPost && (
        <>
          <Text style={styles.postLabel}>Title</Text>
          <TextInput
            style={styles.input}
            defaultValue={selectedPost.title}
            onChangeText={(text) => setUpdatedPost((prev) => ({ ...prev, title: text }))}
          />

          <Text style={styles.postLabel}>Content</Text>
          <TextInput
            style={styles.input}
            defaultValue={selectedPost.content}
            multiline
            onChangeText={(text) => setUpdatedPost((prev) => ({ ...prev, content: text }))}
          />

          <Image source={updatedPost.image} style={styles.image} />

          {/* You can add an image picker here for updating the image */}
          {/* Update the image URI in the handleUpdatePost function */}

          <TouchableOpacity onPress={handleUpdatePost} style={styles.updateButton}>
            <Text style={styles.btnText}>Update Post</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white'
  },
  input: {
    borderWidth: 0.7,
    borderColor: '#ccc',
    marginBottom: 16,
    padding: 12,
    borderRadius: 15
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  postLabel:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  updateButton: {
    backgroundColor: '#00000d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText:{
    color: 'white'
  }
});

export default UpdateForum;
