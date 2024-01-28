import forumData from '../../data/ForumData';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';


const SeeMyForum = ({navigation}) => {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState({});
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleComments = (postId) => {
    setShowComments((prevShowComments) => ({
      ...prevShowComments,
      [postId]: !prevShowComments[postId],
    }));
  };

  const handleAddComment = (postId) => {
    // Implement your logic to add a new comment here
    console.log(`Adding comment "${newComment}" to post ${postId}`);
    // Clear the input field after adding the comment
    setNewComment('');
  };

  const handleSettngPost = (postId) => {
    setSelectedPostId(postId);
    setIsDropdownVisible(true);
  };

  const handleEditPost = () => {
    // Implement logic to edit the selected post
    console.log(`Editing post ${selectedPostId}`);
    setIsDropdownVisible(false);
    navigation.navigate('UpdateForum',{_id: selectedPostId})

  };

  const handleDeletePost = () => {
    // Implement logic to delete the selected post
    console.log(`Deleting post ${selectedPostId}`);
    setIsDropdownVisible(false);
    Alert.alert(`Deleted your post ${selectedPostId}`);
  };

  return (
    <ScrollView style={styles.container}>
      {forumData.map((discussion) => (
        <View key={discussion.id} style={styles.discussionContainer}>
          <View style={styles.authorInfo}>
            <Image source={discussion.author.avatar} style={styles.avatar} />
            <View>
              <Text style={styles.username}>{discussion.author.username}</Text>
              <Text style={styles.discussionDate}>
                {new Date(discussion.date).toLocaleString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </Text>
            </View>
          </View>
         
          <View style={styles.discussionContent}>
            <Text style={styles.discussionTitle}>{discussion.title}</Text>
            <Image source={discussion.image } style={styles.imageContent} />
            <Text style={styles.discussionText}>{discussion.content}</Text>
            
            
            <View style={styles.interactionButtonsContainer}>
            <TouchableOpacity style={styles.interactionButton}>
              <Text style={styles.interactionButtonText}>{discussion.likes}</Text>
              <Ionicons name="ios-thumbs-up" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.interactionButton}
              onPress={() => toggleComments(discussion.id)}
            >
              <Text style={styles.interactionButtonText}>
                {discussion.comments.length}
              </Text>
              <Ionicons name="ios-chatbubbles" size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSettngPost(discussion.id)}>
              <Entypo name="dots-three-vertical" size={15} style={{ marginLeft: 205 }} />
            </TouchableOpacity>
          </View>
          {showComments[discussion.id] && (
            <View>
                <View style={styles.commentsContainer}>
                    {discussion.comments.map((comment) => (
                    <View key={comment.id} style={styles.commentContainer}>
                        <Image source={comment.author.avatar } style={styles.avatar} />
                        <View>
                            <Text style={styles.commentAuthor}>{comment.author.username}</Text>
                            <Text style={styles.commentText}>{comment.content}</Text>
                            <Text style={styles.discussionDate}>
                            {new Date(comment.date).toLocaleString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                dateStyle: 'short',
                                timeStyle: 'short'
                            })}
                            </Text>
                        </View>

                        
                       
                    </View>
                    ))}
                </View>
                <View style={styles.inputComment}>
                    <Image source={require('../../assets/farmer/1.jpg') } style={styles.avatar} />

                    <View style={{width: '85%'}}>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Add a comment..."
                            value={newComment}
                            multiline
                            onChangeText={(text) => setNewComment(text)}
                            />
                            <TouchableOpacity
                            style={styles.addCommentButton}
                            onPress={() => handleAddComment(discussion.id)}
                            >
                                <Ionicons name='send-sharp' size={20} />
                    
                            </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.cameraButton}
                            onPress={() => handleAddComment(discussion.id)}
                            >
                                <Ionicons name='camera-outline'
                                style={{color: 'grey'}} size={20} />
                    
                            </TouchableOpacity>

                    </View>

                </View>
              </View>
            )}
           
            </View>


          <Modal
                    transparent={true}
                    visible={isDropdownVisible}
                    onRequestClose={() => setIsDropdownVisible(false)}
                  >
                    <TouchableWithoutFeedback onPress={() => setIsDropdownVisible(false)}>
                      <View style={styles.modalOverlay} />
                    </TouchableWithoutFeedback>

                    <View style={styles.dropdownContainer}>
                      <TouchableOpacity onPress={handleEditPost} style={styles.editDelete}>
                      <Feather name='edit' style={styles.editDeleteIcon}/>
                        <Text style={styles.editDeleteText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleDeletePost} style={styles.editDelete}><AntDesign name='delete' style={styles.editDeleteIcon}/>
                        <Text style={styles.editDeleteText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
          </Modal>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  discussionContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
  },
  editDelete:{
    marginHorizontal: 20,
    flexDirection: 'row',
    marginTop: 10
  },
  editDeleteText:{
    fontSize: 18,
    marginVertical: 4
  },
  editDeleteIcon:{
    fontSize: 18,
    marginHorizontal: 10,
    marginVertical: 4

  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  imageContent:{
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  discussionContent: {},
  discussionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  discussionDate: {
    color: '#666',
    marginBottom: 8,
  },
  discussionText: {
    fontSize: 16,
    marginBottom: 8,
  },
  commentButton: {
    // backgroundColor: '#000',
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 8,
  },
  commentButtonText: {
    // color: '#fff',
    fontWeight: 'bold',
  },
  commentsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 8,
    paddingTop: 8,
  },
  commentContainer: {
    marginBottom: 8,
    flexDirection: 'row',
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentText: {
    width: '65%',
    // borderWidth: 1
  },
  interactionButtonsContainer: {
    marginVertical: 8,
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  interactionButton: {
    flexDirection: 'row',
    borderRadius: 4,
    alignItems: 'center',
    marginRight: 25,
  },
  interactionButtonText: {
    fontWeight: 'bold',
    paddingHorizontal: 7,
    paddingVertical: 2
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#ececec',
    paddingVertical: 25,
    borderRadius: 12,
    // marginBottom: 8,
    paddingRight: 40,
    paddingLeft: 38,
    paddingTop: 16

    // flex:1
  },
  addCommentButton: {
    // backgroundColor: '#000',
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 12
  },
  
  cameraButton: {
    // paddingVertical: 8,
    // borderRadius: 4,
    // alignItems: 'center',
    position: 'absolute',
    left: 13,
    bottom: 23 
  },
  inputComment:{
    flexDirection: 'row',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdownContainer: {
    padding: 10,
    backgroundColor: '#fff',
    height: 130,
    // borderWidth: 1,
    borderRadius: 20
  },
});

export default SeeMyForum;