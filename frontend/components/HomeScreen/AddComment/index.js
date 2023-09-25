import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  RefreshControl,
  Modal,
  TextInput,
  Dimensions
} from 'react-native';

const AddComment = ({comments}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const windowHeight = Dimensions.get('window').height;
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={openModal}>
        <Text style={styles.placeholderText}>Add a comment...</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Comments</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.commentList}>
            {comments.map((comment, index) => (
              <View key={index} style={styles.commentItem}>
                <Text>{comment}</Text>
              </View>
            ))}
          </ScrollView>

          <TextInput
            style={styles.commentInput}
            placeholder="Add your comment..."
            
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderText: {
    color: 'gray',
  },
  modalContainer: {
    flex: 1,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
  },
  commentList: {
    flex: 1,
    marginBottom: 16,
  },
  commentItem: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
    borderRadius: 8,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
});

export default AddComment;
