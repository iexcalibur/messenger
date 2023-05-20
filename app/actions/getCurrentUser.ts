import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getCurrentUser = async () => {

  try {
    const session = await getSession();

    //If session not exist
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      }
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
  //Catch to check if any error or not
};

export default getCurrentUser;
