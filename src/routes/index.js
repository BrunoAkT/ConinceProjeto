import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MedControl from '../pages/MedControl/MedControl-index'
import Entrar from '../pages/Entrar2/Entrar-index'
import Cadastro from '../pages/Cadastro2/cadastro-index'
import UsuarioSecundario from '../pages/UsuarioSecundario/UsuarioSec-index'
import Perfil from '../pages/Perfil/perfil-index'
import Home from '../pages/Home/home-index'
import MedAdd from '../pages/MedAdd/MedAdd-Index'
import Localizacao from '../pages/Localização/localMap-index'
import EditProfile from '../pages/EditProfile/EditProfile-index'

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator initialRouteName="MedAdd">
            <Stack.Screen
                name="MedControl"
                component={MedControl}
                options={{ headerShown: false, animationEnabled: true }}
            />
            <Stack.Screen
                name="Entrar"
                component={Entrar}
                options={{ headerShown: false, animationEnabled: true }}
            />
            <Stack.Screen
                name="Cadastro"
                component={Cadastro}
                options={{ headerShown: false, animationEnabled: true }}
            />
            <Stack.Screen
                name="UsuarioSecundario"
                component={UsuarioSecundario}
                options={{ headerShown: false, animationEnabled: true }}
            />
            <Stack.Screen
                name="Perfil"
                component={Perfil}
                options={{ headerShown: false, animationEnabled: true}}
            />
            <Stack.Screen
                name='Home'
                component={Home}
                options={{ headerShown: false, animationEnabled: true}}
            />
            <Stack.Screen
                name='MedAdd'
                component={MedAdd}
                options={{ headerShown: false, animationEnabled: true}}
            />
            <Stack.Screen
                name='Localização'
                component={Localizacao}
                options={{ headerShown: false, animationEnabled: true}}
            />
            
            <Stack.Screen
                name='EditProfile'
                component={EditProfile}
                options={{ headerShown: false, animationEnabled: true}}
            />
        </Stack.Navigator>
    )
}