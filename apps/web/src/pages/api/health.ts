export default function handler(req: any, res: any) {
  if (req.method === 'GET') {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'cp-main-staging',
      environment: process.env.NODE_ENV || 'development',
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({message: 'Method not allowed'});
  }
}
