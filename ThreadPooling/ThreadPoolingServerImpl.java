//Java Program to illustrate Thread Pooling
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.io.IOException;
import java.net.ServerSocket;


class SampleThread implements Runnable {

    public Socket socket = null;
    public int count;

    public SampleThread(Socket socket, int count) {
        this.socket = socket;
        this.count   = count;
    }

    public void run() {
        try {
            InputStream input  = socket.getInputStream();
            OutputStream output = socket.getOutputStream();
            long time = System.currentTimeMillis();
            output.write(("HTTP/1.1 200 OK\n\n Sample Thread called  " + this.count + " - " + time + "").getBytes());
            output.close();
            input.close();
            System.out.println("Request processed: " + time);
            } catch (IOException e) {
            e.printStackTrace();
            }
     }
}

public class ThreadPoolingServerImpl implements Runnable { 

    public int serverPort = 0;
    public boolean isStopped = false;
    public static int count = 0;
    public Thread runningThread= null;
    public ServerSocket serverSocket = null;
    //Define the fixed size of the Thread Pool
    public ExecutorService threadPool = Executors.newFixedThreadPool(5);

    public ThreadPoolingServerImpl(int port_num){
        this.serverPort = port_num;
    }

    public void run(){
        //synchronized block
        synchronized(this){
            this.runningThread = Thread.currentThread();
        }
        openServerSocket();
        while(! isStopped()){
            Socket socket = null;
            try {
                socket = this.serverSocket.accept();
            } catch (IOException e) {
                if(isStopped()) {
                    System.out.println("Server Stopped.") ;
                    break;
                }
                throw new RuntimeException("Error in connection", e);
            }
            this.threadPool.execute(new SampleThread(socket, count++));
        }
    }


    private synchronized boolean isStopped() {
        return this.isStopped;
    }
    //shutdown
    public synchronized void stop(){
        this.isStopped = true;
        try {
            this.serverSocket.close();
        } catch (IOException e) {
            throw new RuntimeException("Error closing server", e);
        }
    }

    private void openServerSocket() {
        count++;
        try {
            this.serverSocket = new ServerSocket(this.serverPort);
            } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    //main method
    public static void main(String[] args) {
        ThreadPoolingServerImpl server = new ThreadPoolingServerImpl(3001);
        new Thread(server).start();
    }
}