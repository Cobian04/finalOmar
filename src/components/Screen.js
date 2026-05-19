import React from "react";
import { ScrollView, StyleSheet, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, spacing } from "../theme";

export function Screen({ children, scroll = true, contentStyle }) {
  const { width } = useWindowDimensions();

  if (!scroll) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={[styles.container, contentStyle]}>{children}</View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
      >
        <View
          style={[
            styles.content,
            width >= 1100 ? styles.contentWide : width >= 768 ? styles.contentTablet : null,
            contentStyle
          ]}
        >
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1
  },
  content: {
    paddingHorizontal: spacing.page,
    paddingTop: 8,
    paddingBottom: spacing.tabOffset,
    width: "100%",
    alignSelf: "center"
  },
  contentTablet: {
    maxWidth: 820
  },
  contentWide: {
    maxWidth: 960
  }
});
