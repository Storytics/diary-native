import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_KEY } from "utils/constants";

export default createClient(SUPABASE_URL, SUPABASE_KEY, {
  localStorage: AsyncStorage as any,
});
