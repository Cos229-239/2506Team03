import React, { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import skillCategories from '../assets/data/skillCategories';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (selected: string[]) => void;
  initialSelected: string[];
  mode: 'skills' | 'interests';
};

export default function SkillSelectorModal({
  visible,
  onClose,
  onSave,
  initialSelected,
  mode,
}: Props) {
  const [selected, setSelected] = useState<string[]>(initialSelected);

  useEffect(() => {
    setSelected(initialSelected);
  }, [visible]);

  const toggleSkill = (skill: string) => {
    setSelected((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>
            Select {mode === 'skills' ? 'Skills You Can Offer' : 'Skills You Want to Learn'}
          </Text>
          <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
            {skillCategories.map((cat) => (
              <View key={cat.category}>
                <Text style={styles.category}>{cat.category}</Text>
                <View style={styles.chipGroup}>
                  {cat.skills.map((skill) => (
                    <Pressable
                      key={skill}
                      onPress={() => toggleSkill(skill)}
                      style={[
                        styles.chip,
                        selected.includes(skill) && styles.chipSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          selected.includes(skill) && styles.chipTextSelected,
                        ]}
                      >
                        {skill}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.buttonRow}>
            <Pressable onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
    padding: 16,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    maxHeight: '90%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  category: {
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: '#6b88b7',
    borderColor: '#020a02ff',
  },
  chipText: {
    color: '#333',
  },
  chipTextSelected: {
    color: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelButton: {
    marginRight: 185,
    backgroundColor: '#beaba9',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: '#9DD4B6',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  buttonText: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
  },
});