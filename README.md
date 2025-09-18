# Uniship - Professional Package Tracking System

A modern, responsive React application for package tracking with role-based access control for Admin, User, and Courier roles.

## 🚀 Features

### Core Functionality
- **Multi-role Authentication**: Admin, User, and Courier roles with different permissions
- **Package Tracking**: Real-time tracking with detailed status updates
- **Shipment Management**: Create, view, and manage shipments
- **Dashboard Views**: Role-specific dashboards with relevant information
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### User Roles & Capabilities

#### 👤 User
- Create new shipments
- Track packages in real-time
- View shipment details and history
- Manage profile information
- Contact support

#### 🚚 Courier
- View assigned deliveries
- Update shipment status
- Track delivery progress
- Manage availability status
- View performance metrics

#### 👨‍💼 Admin
- Monitor all shipments
- Manage courier accounts
- View analytics and reports
- Access comprehensive dashboard
- System-wide oversight

## 🛠️ Technology Stack

- **Frontend**: React 19 with Vite
- **Routing**: React Router DOM
- **Styling**: Custom CSS with CSS Variables
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Forms**: React Hook Form with validation
- **State Management**: React Context API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd uniship
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔐 Demo Credentials

The application includes demo accounts for testing different roles:

### Admin Account
- **Email**: admin@uniship.com
- **Password**: admin123
- **Access**: Full system administration

### User Account
- **Email**: user@uniship.com
- **Password**: user123
- **Access**: Create and track shipments

### Courier Account
- **Email**: courier@uniship.com
- **Password**: courier123
- **Access**: Manage deliveries and update status

## 📱 Pages & Features

### Public Pages
- **Login**: Secure authentication with demo credentials
- **Signup**: User registration with form validation

### Protected Pages
- **Home**: Role-specific dashboard with quick actions
- **Create Shipment**: Multi-step form for creating new shipments
- **Tracking**: Search and view shipment status
- **Shipment Details**: Comprehensive shipment information
- **Profile**: User account management
- **Contact**: Support and help center

### Role-Specific Pages
- **Admin Dashboard**: System analytics and management tools
- **Courier Dashboard**: Delivery management and status updates

## 🎨 Design Features

- **Modern UI**: Clean, professional design with consistent styling
- **Responsive Layout**: Mobile-first approach with breakpoints
- **Smooth Animations**: Framer Motion for enhanced user experience
- **Accessibility**: Proper focus management and keyboard navigation
- **Dark/Light Theme**: CSS custom properties for easy theming

## 📊 Mock Data

The application includes comprehensive mock data:
- Sample shipments with tracking history
- User profiles for all roles
- Courier information and performance metrics
- Analytics data for admin dashboard
- Service types and package categories

## 🔧 Development

### Project Structure
```
src/
├── components/          # Reusable UI components
│   └── Layout.jsx      # Main layout with sidebar and header
├── contexts/           # React Context providers
│   └── AuthContext.jsx # Authentication state management
├── data/              # Mock data and constants
│   └── mockData.js    # Sample data for all entities
├── pages/             # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── CreateShipment.jsx
│   ├── Tracking.jsx
│   ├── ShipmentDetails.jsx
│   ├── Profile.jsx
│   ├── AdminDashboard.jsx
│   ├── CourierDashboard.jsx
│   └── Contact.jsx
├── App.jsx            # Main application component
├── App.css            # Global styles and components
├── index.css          # Base styles and utilities
└── main.jsx           # Application entry point
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - GitHub Pages

## 🔮 Future Enhancements

- **Real-time Updates**: WebSocket integration for live tracking
- **Maps Integration**: Interactive maps for delivery routes
- **Push Notifications**: Mobile notifications for status updates
- **API Integration**: Connect to real shipping APIs
- **Advanced Analytics**: Detailed reporting and insights
- **Mobile App**: React Native companion app
- **Multi-language**: Internationalization support

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Email: support@uniship.com
- Phone: +1 (555) 123-4567
- Documentation: [Link to docs]

---

Built with ❤️ using React and modern web technologies.