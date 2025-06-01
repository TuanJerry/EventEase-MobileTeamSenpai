import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
      },
      header: {
        fontSize: 20,
        fontWeight: '600',
        alignSelf: 'center',
        marginVertical: 10,
      },
      headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        position: 'relative',
      },
      
      headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginHorizontal: 40,
      },
      
      headerButton: {
        backgroundColor: '#4B49C8',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
      },
    
      headerButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
      },
      loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      label: {
        fontWeight: '500',
        marginBottom: 6,
        marginTop: 12,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
      },
      textArea: {
        height: 100,
      },
      plus: {
        fontSize: 24,
        color: '#aaa',
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      half: {
        flex: 0.48,
      },
      tag: {
        backgroundColor: '#d0f0f6',
        padding: 8,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginTop: 4,
      },
      button: {
        backgroundColor: '#4B49C8',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 24,
      },
      buttonText: {
        color: '#fff',
        fontWeight: '600',
      },
      imageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        flexWrap: 'wrap',
      },
      imagePlaceholder: {
        width: 70,
        height: 70,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
      },
      imageWrapper: {
        position: 'relative',
        marginBottom: 8,
      },
      
      deleteButton: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: '#ff5555',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
      },
      
      deleteText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
      },
      tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginVertical: 8,
      },
      tagButton: {
        borderWidth: 1,
        borderColor: '#4B49C8',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
      },
      tagButtonSelected: {
        backgroundColor: '#4B49C8',
      },
      tagText: {
        color: '#4B49C8',
        fontSize: 14,
      },
      tagTextSelected: {
        color: '#fff',
      },
      customTagRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
      },
      addButton: {
        backgroundColor: '#4B49C8',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
      },
      addButtonText: {
        color: '#fff',
        fontSize: 14,
      },
      selectedTagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
      },
      selectedTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#d0f0f6',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
      },
      selectedTagText: {
        marginRight: 6,
        fontSize: 14,
      },
      removeTagText: {
        color: '#ff5555',
        fontWeight: 'bold',
        fontSize: 14,
      },
      inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
      },
      
      inputFlex: {
        flex: 1,
        fontSize: 14,
      },
      suggestionsContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginTop: 4,
        padding: 8,
        maxHeight: 150,
      },
      
      suggestionItem: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      
      customImagePicker: { 
        flexDirection: "row", 
        alignItems: "center", 
        marginBottom: 10 
      },
      
  });