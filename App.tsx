// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { useEffect, useState } from "react";
// import { onAuthStateChanged, User } from "firebase/auth";
// import { FIREBASE_AUTH } from "./FirebaseConfig";
// import Login from "./app/screens/Login";
// import List from "./app/screens/List";
// import Detail from "./app/screens/Detail";
// import PatientList from "./app/screens/PatientList";
// import ReadyForOT from "./app/screens/ReadyForOT";

// const Stack = createNativeStackNavigator();
// const InsideStack = createNativeStackNavigator(); // ✅ Fixed incorrect naming

// function InsideLayout() {
//   return (
//     <InsideStack.Navigator screenOptions={{ headerShown: false }}>
//       <InsideStack.Screen name="List" component={List} />
//       <InsideStack.Screen name="Detail" component={Detail} />
//       <InsideStack.Screen name="PatientList" component={PatientList} />
//       <InsideStack.Screen name="ReadyForOT" component={ReadyForOT} />
//     </InsideStack.Navigator>
//   );
// }

// export default function App() {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     onAuthStateChanged(FIREBASE_AUTH, (user) => {
//       console.log("user", user);
//       setUser(user);
//     });
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         {user ? (
//           <Stack.Screen
//             name="Inside"
//             component={InsideLayout}
//             options={{ headerShown: false }}
//           />
//         ) : (
//           <Stack.Screen
//             name="Login"
//             component={Login}
//             options={{ headerShown: false }}
//           />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import Login from "./app/screens/Login";
import List from "./app/screens/List";
import Detail from "./app/screens/Detail";
import PatientList from "./app/screens/PatientList";
import ReadyForOT from "./app/screens/ReadyForOT";
import Patients from "./api/models/Patients";

// Define the type for navigation params
export type RootStackParamList = {
  List: undefined;
  Detail: { patient: typeof Patients };
  PatientList: undefined;
  ReadyForOT: undefined;
};

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator<RootStackParamList>(); // ✅ Correctly typed

function InsideLayout() {
  return (
    <InsideStack.Navigator screenOptions={{ headerShown: false }}>
      <InsideStack.Screen name="List" component={List} />
      <InsideStack.Screen name="Detail" component={Detail} />
      <InsideStack.Screen name="PatientList" component={PatientList} />
      <InsideStack.Screen name="ReadyForOT" component={ReadyForOT} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen
            name="Inside"
            component={InsideLayout}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
