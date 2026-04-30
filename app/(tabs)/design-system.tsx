import { ScrollView, StyleSheet, View } from 'react-native';

import {
  Avatar,
  Badge,
  Button,
  Card,
  Heading,
  Input,
  Surface,
  Tag,
  Text,
  useTheme,
} from '@/src/design-system';

export default function DesignSystemShowcaseScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        {
          gap: theme.spacing.lg,
          padding: theme.spacing.lg,
          paddingTop: theme.spacing.xl,
        },
      ]}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <View style={styles.section}>
        <Text size="sm" tone="primary" variant="label" weight="bold">
          Showcase
        </Text>
        <Heading>Design System</Heading>
        <Text tone="muted">
          Esta tela exibirá tokens, temas e componentes base em variações, tamanhos e estados.
        </Text>
      </View>

      <View style={styles.section}>
        <Heading level={2}>Tipografia</Heading>
        <Heading level={1}>Heading nivel 1</Heading>
        <Heading level={2}>Heading nivel 2</Heading>
        <Heading level={3}>Heading nivel 3</Heading>
        <Text>Texto body padrao usando tokens do tema.</Text>
        <Text size="sm" tone="muted">
          Texto muted em tamanho sm.
        </Text>
        <Text size="xs" tone="primary" variant="label" weight="bold">
          Label xs primary
        </Text>
      </View>

      <View style={styles.section}>
        <Heading level={2}>Botoes</Heading>
        <View style={styles.row}>
          <Button size="sm">Primary sm</Button>
          <Button>Primary md</Button>
          <Button size="lg">Primary lg</Button>
        </View>
        <View style={styles.row}>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </View>
        <View style={styles.row}>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </View>
      </View>

      <View style={styles.section}>
        <Heading level={2}>Inputs</Heading>
        <Input
          label="Busca"
          placeholder="react native"
          helperText="Digite ao menos 2 caracteres."
        />
        <Input label="Com erro" value="r" error="Informe uma busca mais especifica." />
        <Input editable={false} label="Desabilitado" value="typescript" />
      </View>

      <View style={styles.section}>
        <Heading level={2}>Surfaces</Heading>
        <Surface>
          <Heading level={3}>Surface padrao</Heading>
          <Text tone="muted">Container base para blocos simples de conteudo.</Text>
        </Surface>
        <Card elevated padding="lg">
          <Heading level={3}>Card elevado</Heading>
          <Text tone="muted">Usado para itens repetidos, como repositorios e issues.</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <Heading level={2}>Badges e tags</Heading>
        <View style={styles.row}>
          <Badge>Primary</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="warning">Warning</Badge>
          <Badge tone="danger">Danger</Badge>
          <Tag tone="muted" variant="outline">
            TypeScript
          </Tag>
        </View>
      </View>

      <View style={styles.section}>
        <Heading level={2}>Avatares</Heading>
        <View style={styles.row}>
          <Avatar name="GitHub User" size="sm" />
          <Avatar name="Victor Gadder" />
          <Avatar name="Open Source" size="lg" />
          <Avatar
            name="GitHub Octocat"
            size="xl"
            sourceUri="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  row: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  section: {
    gap: 12,
  },
});
