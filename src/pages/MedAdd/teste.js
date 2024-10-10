import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import * as Notifications from 'expo-notifications';

// Configuração das permissões de notificação
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [notification, setNotification] = useState(false);
  const [notificationId, setNotificationId] = useState(null);
  const [HoursAway, setHoursAway] = useState('');  // Intervalo de horas
  const [DurationAlarm, setDurationAlarm] = useState('');  // Duração em dias

  // Função para agendar o alarme com repetição
  const scheduleAlarm = async () => {
    // Solicita permissão ao usuário para enviar notificações
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      const intervalInHours = parseInt(HoursAway); // Número de horas de intervalo
      const durationInDays = parseInt(DurationAlarm); // Número de dias que o alarme deve durar

      if (isNaN(intervalInHours) || isNaN(durationInDays)) {
        console.log("Insira valores válidos.");
        return;
      }

      const totalNotifications = Math.floor((24 / intervalInHours) * durationInDays); // Calcula quantas notificações serão enviadas

      // Agenda várias notificações de acordo com a duração e o intervalo
      for (let i = 0; i < totalNotifications; i++) {
        const trigger = new Date();
        trigger.setHours(trigger.getHours() + intervalInHours * i); // Ajusta o horário de disparo

        const id = await Notifications.scheduleNotificationAsync({
          content: {
            title: "Hora de tomar sua medicação!",
            body: "Não se esqueça de tomar a medicação agora.",
          },
          trigger,
        });

        setNotificationId(id); // Armazena o ID da notificação
        setNotification(true);  // Atualiza o estado para notificação ativa
        console.log('Notificação agendada!', id, trigger);
      }
    } else {
      console.log("Permissão para notificações não concedida.");
    }
  };

  // Função para cancelar a notificação
  const cancelAlarm = async () => {
    if (notificationId) {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      setNotification(false); // Notificação cancelada
      console.log("Notificação cancelada");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder='Intervalo em horas'
        keyboardType='numeric'
        onChangeText={(text) => setHoursAway(text)}
        value={HoursAway}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder='Duração em dias'
        keyboardType='numeric'
        onChangeText={(text) => setDurationAlarm(text)}
        value={DurationAlarm}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 5 }}
      />
      <Text>Alarme com Expo Notifications</Text>
      <Button title="Configurar Alarme" onPress={scheduleAlarm} />
      {notification && (
        <Button title="Cancelar Alarme" onPress={cancelAlarm} />
      )}
    </View>
  );
};

export default App;
