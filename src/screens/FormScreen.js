import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input, Icon, Dialog } from "@rneui/themed";
import { Button } from "@rneui/themed";

const FormScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [date, setDate] = useState(new Date());

  // Email RegExp format
  function isValidEmail(email) {
    const regX = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    return regX.test(email);
  }

  // handle name input
  const handleNameChange = (newName) => {
    if (newName.match(/^[a-zA-Z]+$/) || newName.length == 0) {
      setName(newName);
    }
  };

  // handle email input
  const handleEmailChange = (newEmail) => {
    setInvalidEmail(false);
    setEmail(newEmail);
  };

  // handle submit button
  const handleSubmit = () => {
    if (isValidEmail(email)) {
      setVisible1(!visible1);
    } else {
      setInvalidEmail(true);
    }
  };

  const toggleDialog1 = () => {
    setVisible1(!visible1);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Pleasd enter your infomation</Text>
      <View
        style={{
          width: "90%",
        }}
      >
        <Input
          placeholder="Name"
          value={name}
          maxLength={50}
          onChangeText={handleNameChange}
          errorStyle={{ color: "red" }}
          errorMessage={name == "" ? "please enter your name" : ""}
        />
        <Input
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Email"
          errorStyle={{ color: "red" }}
          errorMessage={
            email == ""
              ? "please enter your email"
              : invalidEmail
              ? "please enter valid email address"
              : ""
          }
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 20, paddingLeft: 7 }}>Birth date</Text>
          <DateTimePicker
            style={{ height: 35, width: 200 }}
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={false}
            display="default"
            onChange={onChange}
            maximumDate={new Date()}
          />
        </View>
      </View>
      <Button
        onPress={handleSubmit}
        type="outline"
        title="Submit"
        style={{ paddingTop: 20 }}
      />
      <Dialog isVisible={visible1} onBackdropPress={toggleDialog1}>
        <Dialog.Title title={name + " information "} />
        <Text>Name: {name}</Text>
        <Text>Email: {email}</Text>
        <Text>
          BirthDay:{" "}
          {date.toLocaleDateString("en-gb", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </Text>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default FormScreen;
