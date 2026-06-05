import React, { useState } from 'react';
import { Table, Form, Input, Button, Space, Typography, message, Card, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title } = Typography;

const GestionAbonnes = () => {
  const [form] = Form.useForm();
  const [abonnes, setAbonnes] = useState([]);

  // 🟢 Fonction d'ajout d'abonné
  const handleSubmit = (values) => {
    try {
      // Vérifier que la date est choisie
      if (!values.dateFin) {
        message.error("Veuillez choisir une date de fin !");
        return;
      }

      const newAbonne = {
        key: Date.now(),
        nom: values.nom,
        prenom: values.prenom,
        email: values.email,
        dateFin: values.dateFin.format('YYYY-MM-DD'),
      };

      // Ajouter au tableau
      setAbonnes((prev) => [...prev, newAbonne]);

      message.success("✅ Abonné ajouté avec succès !");
      form.resetFields();
    } catch (err) {
      console.error("Erreur lors de l’ajout :", err);
      message.error("Une erreur est survenue lors de l’ajout.");
    }
  };

  // 📋 Colonnes du tableau
  const columns = [
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
    },
    {
      title: 'Prénom',
      dataIndex: 'prenom',
      key: 'prenom',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Date fin abonnement',
      dataIndex: 'dateFin',
      key: 'dateFin',
      render: (text) => dayjs(text).format('DD/MM/YYYY'),
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%', padding: '2rem' }}>
      <Title level={3}>BOUM "BODY ON ULTRAT MODE"</Title>

      {/* 🧾 Formulaire */}
      <Card title="Ajouter un abonné" bordered style={{ maxWidth: 600 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="nom"
            label="Nom"
            rules={[{ required: true, message: 'Entrez le nom' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="prenom"
            label="Prénom"
            rules={[{ required: true, message: 'Entrez le prénom' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email', message: 'Email invalide' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="dateFin"
            label="Date de fin d’abonnement"
            rules={[{ required: true, message: 'Sélectionnez une date' }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
              Ajouter
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* 📋 Tableau des abonnés */}
      <Card title="Liste des abonnés">
        <Table
          columns={columns}
          dataSource={abonnes}
          pagination={{ pageSize: 5 }}
          bordered
        />
      </Card>
    </Space>
  );
};

export default GestionAbonnes;
